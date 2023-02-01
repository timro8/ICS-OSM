import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const AdminPageFacultyComponent = ({ faculty }) => (
  <tr>
    <td>{faculty.firstName}</td>
    <td>{faculty.email}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/edit/${faculty._id}`}>Edit Profile</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
AdminPageFacultyComponent.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageFacultyComponent;
