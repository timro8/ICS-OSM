import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Col, Row, Container, ListGroup, Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import { RoomNotes } from '../../api/room/RoomNotes';
import { RoomJacks } from '../../api/room/RoomJacks';
import RoomNote from '../components/RoomNote';
import AddNote from '../components/AddNote';
import RoomJack from '../components/RoomJack';
import AddJack from '../components/AddJack';
import LoadingSpinner from '../components/LoadingSpinner';

/* A simple static component to render some text for the landing page. */
const RoomDetails = () => {
  // Get the documentID from the URL field.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const {
    doc,
    doc: { roomNumber, capacity, picture, status },
    docNotes,
    docJacks,
    ready,
    loggedInOwner,
  } = useTracker(() => {
    const subRoom = Rooms.subscribeRoomAdmin();
    const subNotes = RoomNotes.subscribeRoomNotesAdmin();
    const subJacks = RoomJacks.subscribeRoomJacksAdmin();
    const owner = Meteor.user().username;
    const rdy = subRoom.ready() && subNotes.ready() && subJacks.ready();
    const document = Rooms.findDoc(_id);
    const documentNotes = RoomNotes.find({ roomId: _id }).fetch();
    const documentJacks = RoomJacks.find({ roomId: _id }).fetch();
    return {
      doc: document,
      docNotes: documentNotes,
      docJacks: documentJacks,
      loggedInOwner: owner,
      ready: rdy,
    };
  });

  return ready ? (
    <Container id={PAGE_IDS.ROOM_DETAILS} className="py-3" doc={doc}>
      <h1>Room {roomNumber} Details</h1>
      <Row>
        <Col>
          <p>Connect me to the room occupant collection</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p><strong>Room Status:</strong> {status}</p>
          <p><strong>Capacity:</strong> {capacity}</p>
          <Image src={picture} alt={`${roomNumber} picture`} width={100} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>this is for the equipment</h2>
        </Col>
        <Col>
          <h2>Room Data Jacks</h2>
          <ListGroup as="ol" numbered variant="flush">
            {docJacks.map((jack) => <RoomJack key={jack._id} jack={jack} />)}
          </ListGroup>
          <AddJack owner={loggedInOwner} roomId={_id} />
        </Col>
        <Col>
          <h2>Room Notes</h2>
          <ListGroup variant="flush">
            {docNotes.map((note) => <RoomNote key={note._id} note={note} />)}
          </ListGroup>
          <AddNote roomId={_id} owner={loggedInOwner} />
        </Col>
      </Row>

    </Container>
  ) : <LoadingSpinner message="Loading room details" />;
};

export default RoomDetails;
