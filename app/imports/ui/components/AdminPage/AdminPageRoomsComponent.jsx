import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageRoomsComponent.jsx. */
const AdminPageFacultyComponent = ({ room }) => (
  <tr>
    <td>{room.location}</td>
    <td>{room.roomNumber}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_ROOM_EDIT} to={`/roomdetails/${room.roomKey}`}>Edit Room Details</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
AdminPageFacultyComponent.propTypes = {
  room: PropTypes.shape({
    roomKey: PropTypes.string,
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageFacultyComponent;
