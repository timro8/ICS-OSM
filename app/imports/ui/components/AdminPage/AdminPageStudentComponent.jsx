import React from 'react';
import PropTypes from 'prop-types';
import EditStudent from '../Editpages/EditStudent';
import DeleteStudent from '../DeleteStudent';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageStudentComponent.jsx. */
const AdminPageStudentComponent = ({ studentProfile }) => (
  <tr>
    <td>{studentProfile.firstName}</td>
    <td>{studentProfile.lastName}</td>
    <td>{studentProfile.email}</td>
    <td>Position</td>
    <td><EditStudent id={studentProfile._id} /></td>
    <td><DeleteStudent id={studentProfile._id} /></td>
  </tr>
);

AdminPageStudentComponent.propTypes = {
  studentProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageStudentComponent;
