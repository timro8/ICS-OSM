import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Room table. See pages/ListRoom.jsx. */
const RoomItem = ({ room }) => (
  <tr>
    <td>{room.roomNumber}</td>
    <td>{room.location}</td>
    <td>{room.status}</td>
    <td>{room.roomNotes}</td>
    <td>
      make edit
    </td>
  </tr>
);

// Require a document to be passed to this component.
RoomItem.propTypes = {
  room: PropTypes.shape({
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    roomNotes: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomItem;
