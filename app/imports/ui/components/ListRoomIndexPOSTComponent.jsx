import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageRoomsComponent.jsx. */
const ListRoomIndexPOSTComponent = ({ room }) => (
  <ul>
    <li>{room.location} {room.roomNumber}</li>
  </ul>
);

// Require a document to be passed to this component.
ListRoomIndexPOSTComponent.propTypes = {
  room: PropTypes.shape({
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ListRoomIndexPOSTComponent;
