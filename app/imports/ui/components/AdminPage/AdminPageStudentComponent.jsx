import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const AdminPageStudentComponent = ({ studentProfile }) => (
  <tr>
    <td>
      {studentProfile.firstName} {studentProfile.lastName}
    </td>
    <td>{studentProfile.email}</td>
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
