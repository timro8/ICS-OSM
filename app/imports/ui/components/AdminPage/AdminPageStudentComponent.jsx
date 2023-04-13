import React from 'react';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { ROLE } from '../../../api/role/Role';
import EditStudent from '../Editpages/EditStudent';
import DeleteStudent from '../DeleteStudent';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageStudentComponent.jsx. */
const AdminPageStudentComponent = ({ studentProfile }) => {

  return (
    <tr>
      <td>{studentProfile.firstName}</td>
      <td>{studentProfile.lastName}</td>
      <td>{studentProfile.email}</td>
      <td>Position</td>
      <td><EditStudent id={studentProfile._id} /></td>
      <td><DeleteStudent id={studentProfile._id} /></td>
    </tr>
  );
};

AdminPageStudentComponent.propTypes = {
  studentProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageStudentComponent;
