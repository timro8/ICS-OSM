import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single card in the List Room Admin card. See pages/ListRoomAdmin.jsx. */
const RoomItem = ({ room }) => (
  <Col>
    <Card border="success" className="h-100">
      <Card.Img variant="top" src={room.picture} alt={`${room.roomNumber} picture`} />
      <Card.Body>
        <Card.Title>{room.location} {room.roomNumber}</Card.Title>
        <Card.Subtitle>
          {room.occupants.map((o, index) => <p key={index}>{o}</p>)}
        </Card.Subtitle>
        <Card.Text>
          <strong>Status:</strong> {room.status}
        </Card.Text>
        <Card.Text>
          <strong>Room capacity:</strong> {room.capacity}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link className={COMPONENT_IDS.ROOM_DETAILS} to={`/roomdetails/${room.roomKey}`}>Details</Link>
      </Card.Footer>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
RoomItem.propTypes = {
  room: PropTypes.shape({
    roomKey: PropTypes.string,
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    capacity: PropTypes.number,
    _id: PropTypes.string,
    occupants: PropTypes.arrayOf(PropTypes.string),
    picture: PropTypes.string,
  }).isRequired,
};

export default RoomItem;
