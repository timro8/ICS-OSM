import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Card, Image, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const MakeCard = ({ room }) => (
  <Col>
    <Card border="primary" className="h-100">
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

/* Renders a table containing all of the Room documents. Use <RoomItemAdmin> to render each row. */
const ListRoomAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { rooms, ready } = useTracker(() => {
    // Get access to Room documents.
    const subscription = Rooms.subscribeRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Rooms.find({}).fetch();
    return {
      rooms: items,
      ready: rdy,
    };
  }, []);
  return ready ? (
    <Container id={PAGE_IDS.LIST_ROOM_ADMIN} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {rooms.map((room) => <MakeCard key={room._id} room={room} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
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

export default ListRoomAdmin;
