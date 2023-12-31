import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Plus } from 'react-bootstrap-icons';
import { RoomNotes } from '../../../api/room/RoomNotes';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import CircleButton from '../CircleButton';

// form schema based on RoomNotes collection
const formSchema = new SimpleSchema({
  note: String,
  roomId: String,
  owner: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddRoomNote component for adding a new note. */
const AddRoomNote = ({ roomId, owner }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // data submitted to add a new note. If there are errors, an error message will appear. If the data is added successfully, a success message will appear. Upon success, the form resets to allow the user to add additional notes.
  const submit = (data, formRef) => {
    const { note, createdAt } = data;
    const collectionName = RoomNotes.getCollectionName();
    const definitionData = { note, roomId, owner, createdAt };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Note added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <>
      <CircleButton onClick={handleShow} variant="dark" id="add-note" tooltip="Add Note">
        <Plus fontSize="25px " id="add-note" />
      </CircleButton>

      <Modal show={show} onHide={handleClose} id="add-note-form">
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Notes
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="note" id="add-note-form-note" />
            <Button id="add-note-form-submit" type="submit" variant="success">Add</Button>
            <ErrorsField />
            <HiddenField name="owner" value={owner} />
            <HiddenField name="roomId" value={roomId} />
            <HiddenField name="createdAt" value={new Date()} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} id="add-note-form-close-button">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddRoomNote.propTypes = {
  roomId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default AddRoomNote;
