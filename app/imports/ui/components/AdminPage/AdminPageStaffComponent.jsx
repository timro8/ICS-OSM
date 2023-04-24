import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import { StaffProfiles } from '../../../api/user/StaffProfileCollection';
import EditStaffProfile from '../../pages/EditStaffProfile';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { ROLE } from '../../../api/role/Role';
import { OccupantRoom } from '../../../api/user/OccupantRoomCollection';

/** Renders a single row of Staff members in a (Admin) table. See pages/AdminPageStaffComponent.jsx. */
const AdminPageStaffComponent = ({ staffProfile }) => {

  const deleteUser = () => {
    const collectionName = StaffProfiles.getCollectionName();
    const collectionName2 = OccupantRoom.getCollectionName();
    const roomId = staffProfile._id;
    Meteor.call('deleteStaffUser', staffProfile._id);
    removeItMethod.callPromise({ collectionName2, instance: staffProfile._id });
    removeItMethod.callPromise({ collectionName, instance: roomId })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Staff removed successfully', 'success');
      });
  };
  return (
    <tr>
      <td><Image roundedCircle src={staffProfile.image} height="35rem" className="px-2" />
        <Link className={COMPONENT_IDS.LIST_STAFF_ADMIN} to={`/staffprofile/${staffProfile._id}`}>{staffProfile.firstName} {staffProfile.lastName}</Link>
      </td>
      <td>{staffProfile.email}</td>
      <td>{staffProfile.role}</td>
      <td>{staffProfile.office.map(office => <div key={Math.random()}>{office[0].roomNumber}</div>)}
      </td>
      <td><EditStaffProfile id={staffProfile._id}>Edit</EditStaffProfile>
      </td>
      {/** Button for deleting staff users using StaffProfileCollection.js */}
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
        <td><Button variant="danger" onClick={deleteUser}>Delete</Button></td>
      ) : ''}
    </tr>
  );
};

// Require a document to be passed to this component.
AdminPageStaffComponent.propTypes = {
  staffProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    office: PropTypes.instanceOf(Array),
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageStaffComponent;
