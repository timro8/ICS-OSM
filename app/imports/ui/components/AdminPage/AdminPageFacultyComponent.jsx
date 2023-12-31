import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { ROLE } from '../../../api/role/Role';
import { OccupantRoom } from '../../../api/user/OccupantRoomCollection';
import EditFacultyProfile from '../../pages/EditFacultyProfile';

/** Component for StaffSection.jsx */

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const AdminPageFacultyComponent = ({ facultyProfile }) => {

  const deleteUser = () => {
    const collectionName = FacultyProfiles.getCollectionName();
    const collectionName2 = OccupantRoom.getCollectionName();
    const roomId = facultyProfile._id;
    Meteor.call('deleteFacultyUser', facultyProfile._id);
    removeItMethod.callPromise({ collectionName2, instance: facultyProfile._id });
    removeItMethod.callPromise({ collectionName, instance: roomId })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Faculty removed successfully', 'success');
      });
  };

  return (
    <tr>
      <td>
        <Image roundedCircle src={facultyProfile.image} height="35rem" className="px-2" />
        <Link className={COMPONENT_IDS.LIST_FACULTY_ADMIN} to={`/profile/${facultyProfile._id}`}>{facultyProfile.firstName} {facultyProfile.lastName}</Link>
      </td>
      <td>{facultyProfile.email}</td>
      <td>{facultyProfile.facRole}</td>
      <td>{facultyProfile.rooms}</td>
      <td><EditFacultyProfile id={facultyProfile._id}> Edit</EditFacultyProfile></td>
      {/** Button for deleting faculty users using FacultyProfileCollection.js */}
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
        <td><Button id="delete-faculty" variant="danger" onClick={deleteUser}>Delete</Button></td>
      ) : ''}
    </tr>
  );
};

// Require a document to be passed to this component.
AdminPageFacultyComponent.propTypes = {
  facultyProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    facRole: PropTypes.string,
    rooms: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageFacultyComponent;
