import React, { useState } from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import EditStudent from '../Editpages/EditStudent';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { ROLE } from '../../../api/role/Role';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';

const AdminPageStudentComponent = ({ studentProfile }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteStudent = () => {
    const collectionName = StudentProfiles.getCollectionName();
    const studentId = studentProfile._id;
    removeItMethod.callPromise({ collectionName, instance: studentId })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Student removed successfully', 'success');
      });
  };

  return (
    <tr>
      <td>{studentProfile.firstName}</td>
      <td>{studentProfile.lastName}</td>
      <td>{studentProfile.email}</td>
      <td>Position</td>
      <td><EditStudent id={studentProfile._id} /></td>
      <td>{Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
        <div>
          <Button variant="danger" onClick={handleShow}>
            Delete
          </Button>
        </div>
      ) : ''}
      </td>
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title className="d-flex justify-content-center">Delete Club</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-5 text-center">
              <h6>Are you sure you want to <strong>delete</strong> this student?</h6>
              <h6>This action can not be undone.</h6>
            </div>
            <div className="d-flex justify-content-center justify-content-around">
              <Button variant="danger" onClick={deleteStudent}>Delete</Button>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            </div>
          </Modal.Body>
        </Modal>

      ) : ''}
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
