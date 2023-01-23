import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Room (Admin) table. See pages/ListRoomAdmin.jsx. */
const RoomItemAdmin = ({ room }) => (
  <tr>
    <td>{room.roomNumber}</td>
    <td>{room.location}</td>
    <td>{room.status}</td>
    <td>{room.roomNotes}</td>
    <td>{room.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
RoomItemAdmin.propTypes = {
  room: PropTypes.shape({
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    roomNotes: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default RoomItemAdmin;
