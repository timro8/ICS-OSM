import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Col, Row, Container, ListGroup, Image } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import { RoomNotes } from '../../api/room/RoomNotes';
import RoomNote from '../components/RoomNote';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import AddNote from '../components/AddNote';

/* A simple static component to render some text for the landing page. */
const RoomDetails = () => {
  // Get the documentID from the URL field.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, doc: { roomNumber, capacity, picture, status }, ready, docNotes, noteOwner } = useTracker(() => {
    const subscription = Rooms.subscribeRoomAdmin();
    const subscription2 = RoomNotes.subscribeRoomNotesAdmin();
    const owner = Meteor.user().username;
    const rdy = subscription.ready() && subscription2.ready();
    const document = Rooms.findDoc(_id);
    const documentNotes = RoomNotes.find({ roomId: _id }).fetch();
    return {
      doc: document,
      docNotes: documentNotes,
      noteOwner: owner,
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
          <h2>this is for the data jacks</h2>
        </Col>
        <Col>
          <h2>Room Notes</h2>
          <h4>{_id}</h4>
          <h4>{noteOwner}</h4>
          <ListGroup variant="flush">
            {docNotes.map((note) => <RoomNote key={note._id} note={note} />)}
          </ListGroup>
          <AddNote roomId={_id} owner={noteOwner} />
        </Col>
      </Row>

    </Container>
  ) : <LoadingSpinner message="Loading room details" />;
};

export default RoomDetails;
