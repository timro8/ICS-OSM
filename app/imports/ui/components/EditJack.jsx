import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { RoomJacks } from '../../api/room/RoomJacks';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from './LoadingSpinner';

// form schema based on RoomJacks collection schema
const bridge = new SimpleSchema2Bridge(RoomJacks._schema);

/* Renders the AddNote component for adding a new note. */
const EditJack = ({ jackId }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // subscription to RoomJacks (Admin)
  const { doc, ready } = useTracker(() => {
    // Get access to RoomJacks documents.
    const subscription = RoomJacks.subscribeRoomJacksAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document based on the jackId
    const document = RoomJacks.findDoc(jackId);
    return {
      doc: document,
      ready: rdy,
    };
  }, [jackId]);

  // data submitted to update a jack. If there are errors, an error message will appear. If the data successfully updates, a success message appears.
  const submit = (data) => {
    const { jackNumber, description } = data;
    const collectionName = RoomJacks.getCollectionName();
    const updateData = { id: jackId, jackNumber, description };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Jack updated successfully', 'success'));
  };

  return ready ? (
    <>
      <Button variant="info" onClick={handleShow}>
        Edit {doc.jackNumber}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Jack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <TextField name="jackNumber" />
            <TextField name="description" />
            <SubmitField value="Submit" />
            <ErrorsField />
            <HiddenField name="owner" value={doc.owner} />
            <HiddenField name="roomId" value={doc.roomId} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

EditJack.propTypes = {
  jackId: PropTypes.string.isRequired,
};

export default EditJack;
