import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
/** Renders a single card in the List Room Admin card. See pages/ListRoomAdmin.jsx. */
const RoomItem = ({ room }) => (
  <Row className="py-3">
    <Col className="d-flex gap-4">
      <Link to={`/roomdetails/${room._id}`} id="room-card"><Image roundedCircle src={room.picture} width="100px" />
      </Link>
      <div>
        <Link className="fw-bold faculty-name text-decoration-none text-black" to={`/roomdetails/${room._id}`}>{room.location} {room.roomNumber}</Link>
        <div>Status {room.status}</div>
        {room.occupants.length > 0 ? (
          <div>Occupant(s): {room.occupants.map((o) => <div key={o.id} className="text-success">{o.firstName} {o.lastName}</div>)}
          </div>
        ) : ''}

      </div>
    </Col>
  </Row>
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
