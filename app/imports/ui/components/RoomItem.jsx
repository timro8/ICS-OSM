import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Col } from 'react-bootstrap';

/** Renders a single card in the List Room table. See pages/ListRoom.jsx. */
const RoomItem = ({ room }) => (
  <Col>
    <Card border="success" className="h-100">
      <Card.Header>
        <Image src={room.picture} alt={`${room.roomNumber} picture`} width={75} />
        <Card.Title>{room.roomNumber}</Card.Title>
        <Card.Subtitle>{room.location}</Card.Subtitle>
        <Card.Subtitle>Occupant First Name Last Name</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Status:</strong> {room.status}
        </Card.Text>
        <Card.Text>
          <strong>Room capacity:</strong> {room.capacity}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
RoomItem.propTypes = {
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

export default RoomItem;
