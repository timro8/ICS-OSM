import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageRoomsComponent.jsx. */
const AdminPageFacultyComponent = ({ room }) => (
  <tr>
    <td>{room.roomNumber}</td>
    <td>{room.location}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/edit/${room._id}`}>Edit Profile</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
AdminPageFacultyComponent.propTypes = {
  room: PropTypes.shape({
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageFacultyComponent;
