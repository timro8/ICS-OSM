import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { ROLE } from '../../../api/role/Role';
import { ClubOfficers } from '../../../api/clubofficers/ClubOfficersCollection';

// form schema based on the Club collection
const bridge = new SimpleSchema2Bridge(ClubOfficers._schema);

/* Renders the AddClub component for adding a new club. */
const AddClubOfficer = () => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // data added to Club collection. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional clubs.
  const submit = async (data, formRef) => {
    const { studentId, clubId, isPresident, position } = data;
    const collectionName = ClubOfficers.getCollectionName();
    const definitionData = { studentId, clubId, isPresident, position };

    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Club Officer added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;

  return (
    <>
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
        <Button key={Math.random()} style={{ width: '7rem' }} id={COMPONENT_IDS.ADD_CLUB_OFFICER} variant="primary" onClick={handleShow}>
          Add Officer
        </Button>
      ) : ''}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Officer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="studentId" placeholder="Student Email" />
            <TextField name="clubId" placeholder="Club Name" />
            <TextField name="isPresident" placeholder="true or false" />
            <TextField name="position" />
            <div className="d-flex justify-content-end">
              <SubmitField value="Submit" />
            </div>
            <ErrorsField />
          </AutoForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddClubOfficer;
