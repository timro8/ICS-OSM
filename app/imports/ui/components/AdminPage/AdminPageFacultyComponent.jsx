import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import EditFacultyProfile from '../../pages/EditFacultyProfile';
/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const AdminPageFacultyComponent = ({ facultyProfile }) => (
  <tr>
    <td>
      <Image roundedCircle src={facultyProfile.image} height="35rem" className="px-2" />
      <Link className={COMPONENT_IDS.LIST_FACULTY_ADMIN} to={`/profile/${facultyProfile._id}`}>{facultyProfile.firstName} {facultyProfile.lastName}</Link>
    </td>
    <td>{facultyProfile.email}</td>
    <td>{facultyProfile.facRole}</td>
    <td>{facultyProfile.rooms}</td>
    <td><EditFacultyProfile id={facultyProfile._id}> Edit</EditFacultyProfile></td>
  </tr>
);

// Require a document to be passed to this component.
AdminPageFacultyComponent.propTypes = {
  facultyProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    facRole: PropTypes.string,
    rooms: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageFacultyComponent;
