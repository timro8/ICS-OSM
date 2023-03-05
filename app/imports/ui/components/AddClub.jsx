import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Clubs } from '../../api/club/Club';

// form schema based on the Room collection
const bridge = new SimpleSchema2Bridge(Clubs._schema);

/* Renders the AddRoom component for adding a new room. */
const AddClub = () => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // data added to the Room collection. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional rooms.
  const submit = (data, formRef) => {
    const { clubKey, clubName, image, description, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor } = data;
    const collectionName = Clubs.getCollectionName();
    const definitionData = { clubKey, clubName, image, description, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor };

    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Club added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <>
      <Button id={COMPONENT_IDS.ADD_CLUB} variant="primary" onClick={handleShow}>
        Add Club
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Club</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="image" />
            <TextField name="clubKey" placeholder="club(Name:ABBR)" />
            <TextField name="clubName" />
            <LongTextField name="description" />
            <TextField name="joinLink" />
            <TextField name="meetingDay" />
            <TextField name="meetingTime" />
            <TextField name="meetingLocation" />
            <TextField name="officers" />
            <TextField name="advisor" />
            <SubmitField value="Submit" />
            <ErrorsField />
          </AutoForm>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddClub;
