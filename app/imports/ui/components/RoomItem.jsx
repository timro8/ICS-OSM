import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Row table. See pages/ListRoom.jsx */
const RoomItem = ({ room }) => (
  <tr>
    <td>{room.roomNumber}</td>
    <td>{room.location}</td>
    <td>{room.status}</td>
    <td>{room.roomNotes}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_ROOM_EDIT} to={`/edit/${room._id}`}>make edit room</Link>
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
