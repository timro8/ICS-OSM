import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { RoomJacks } from '../../api/room/RoomJacks';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const formSchema = new SimpleSchema({
  roomId: String,
  jackNumber: String,
  description: String,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddNote component for adding a new note. */
const AddJack = ({ roomId, owner }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (data, formRef) => {
    const { jackNumber, description } = data;
    const collectionName = RoomJacks.getCollectionName();
    const definitionData = { roomId, jackNumber, description, owner };
    console.log(definitionData);
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
      <Button variant="primary" onClick={handleShow}>
        Add Jacks
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Jacks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Jacks form
          <p>Room id: {roomId}</p>
          <p>Owner: {owner}</p>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="jackNumber" />
            <TextField name="description" />
            <SubmitField value="submit" />
            <ErrorsField />
            <HiddenField name="owner" value={owner} />
            <HiddenField name="roomId" value={roomId} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddJack.propTypes = {
  roomId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default AddJack;
