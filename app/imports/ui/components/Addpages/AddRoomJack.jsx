import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Plus } from 'react-bootstrap-icons';
import { RoomJacks } from '../../../api/room/RoomJacks';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
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
      <CircleButton onClick={handleShow} variant="dark" id={COMPONENT_IDS.ADD_ROOM_JACK} tooltip="Add Room Jack">
        <Plus fontSize="25px" />
      </CircleButton>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Jacks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Jacks
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="jackNumber" />
            <TextField name="wallLocation" />
            <TextField name="IDFRoom" label="IDF Room" />
            <TextField name="description" />
            <SubmitField value="submit" />
            <ErrorsField />
            <HiddenField name="roomKey" value={roomKey} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
