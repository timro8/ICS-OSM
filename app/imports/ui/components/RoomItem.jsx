import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col, Image } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single card in the List Room Admin card. See pages/ListRoomAdmin.jsx. */
const RoomItem = ({ room }) => (
  <Col className="p-2">
    <Card border="info" className="h-100">
      <Link className={COMPONENT_IDS.ROOM_DETAILS} to={`/roomdetails/${room.roomKey}`} style={{ color: 'black', textDecoration: 'none' }}>
        <Card.Body>
          <Image src={room.picture} alt={`${room.roomNumber} picture`} fluid rounded />
          <hr />
          <Card.Title>{room.location} {room.roomNumber}</Card.Title>
          <Card.Subtitle>
            {room.occupants.map((o, index) => <p key={index}>{o.firstName} {o.lastName}</p>)}
          </Card.Subtitle>
          <Card.Text>
            <strong>Status:</strong> {room.status}
          </Card.Text>
          <Card.Text>
            <strong>Room capacity:</strong> {room.capacity}
          </Card.Text>
          <Card.Text>
            <strong>Room classification:</strong> {room.roomClassification}
          </Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer>
        <Link to={`/editroom/${room._id}`}>Edit Room</Link>
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
    occupants: PropTypes.instanceOf(Array),
    roomClassification: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default RoomItem;
