import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Plus } from 'react-bootstrap-icons';
import { RoomJacks } from '../../../api/room/RoomJacks';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import CircleButton from '../CircleButton';

// form schema based on the RoomJacks collection.
const formSchema = new SimpleSchema({
  roomKey: {
    type: String,
    optional: true,
  },
  jackNumber: String,
  wallLocation: {
    type: String,
    optional: true,
  },
  IDFRoom: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddJac component for adding a new jack. */
const AddRoomJack = ({ roomKey }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // data submitted to add a new jack. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional jacks.
  const submit = (data, formRef) => {
    const { jackNumber, wallLocation, IDFRoom, description } = data;
    const collectionName = RoomJacks.getCollectionName();
    const definitionData = { roomKey, jackNumber, wallLocation, IDFRoom, description };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Jack added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <>
      <CircleButton onClick={handleShow} variant="dark" id="add-room-jack" tooltip="Add Jack">
        <Plus fontSize="25px" id="add-room-jack" />
      </CircleButton>
      <Modal show={show} onHide={handleClose} id="add-room-jack-form">
        <Modal.Header closeButton>
          <Modal.Title>Add Jacks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Jacks
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="jackNumber" id="add-room-jack-form-jacknumber" />
            <TextField name="wallLocation" id="add-room-jack-form-walllocation" />
            <TextField name="IDFRoom" label="IDF Room" id="add-room-jack-form-idfroom" />
            <TextField name="description" id="add-room-jack-form-description" />
            <Button id="add-room-jack-form-submit" type="submit" variant="success">Add</Button>
            <ErrorsField />
            <HiddenField name="roomKey" value={roomKey} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} id="add-room-jack-form-close-button">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddRoomJack.propTypes = {
  roomKey: PropTypes.string.isRequired,
};

export default AddRoomJack;
