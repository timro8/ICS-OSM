import React from 'react';
import { Col, Container, Row, Card, Image, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const MakeCard = ({ room }) => (
  <Col>
    <Card border="success" className="h-100">
      <Card.Header>
        <Image src={room.picture} alt={`${room.roomNumber} picture`} width={75} />
        <Card.Title>{room.roomNumber}</Card.Title>
        <Card.Subtitle><span className="date">{room.location}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Status:</strong> {room.status}
        </Card.Text>
        <Card.Text>
          <strong>Room capacity:</strong> {room.capacity}
        </Card.Text>
        <Card.Text>
          <strong>Owner:</strong> {room.owner}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Edit Room</Button>
      </Card.Footer>
    </Card>
  </Col>
);

/* Renders a table containing all of the Room documents. Use <RoomItem> to render each row. */
const ListRoom = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, rooms } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Rooms.subscribeRoom();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const roomItems = Rooms.find({}, { sort: { roomNumber: 1 } }).fetch();
    return {
      rooms: roomItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_ROOM} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {rooms.map((room) => <MakeCard key={room._id} room={room} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Room" />);
};

MakeCard.propTypes = {
  room: PropTypes.shape({
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    capacity: PropTypes.number,
    _id: PropTypes.string,
    owner: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default ListRoom;
