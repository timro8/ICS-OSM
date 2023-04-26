import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { RoomJacks } from '../../../api/room/RoomJacks';
import { updateMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';

// form schema based on RoomJacks collection schema
const makeSchema = new SimpleSchema({
  roomId: {
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

/* Renders the edit jack. */
const EditJack = ({ jackId }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // subscription to RoomJacks (Admin)
  const { doc, ready } = useTracker(() => {
    // Get access to RoomJacks documents.
    const subscription = RoomJacks.subscribeRoomJacksAdmin();
    const rdy = subscription.ready();
    // Get the document based on the jackId
    const document = RoomJacks.findDoc(jackId);
    return {
      doc: document,
      ready: rdy,
    };
  }, [jackId]);
  const formSchema = makeSchema;
  const bridge = new SimpleSchema2Bridge(formSchema);
  // data submitted to update a jack. If there are errors, an error message will appear. If the data successfully updates, a success message appears.
  const submit = (data) => {
    const { jackNumber, wallLocation, IDFRoom, description } = data;
    const collectionName = RoomJacks.getCollectionName();
    const updateData = { id: jackId, jackNumber, wallLocation, IDFRoom, description };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Jack updated successfully', 'success'));
  };

  return ready ? (
    <>
      <Button variant="outline-secondary" size="sm" onClick={handleShow} id="edit-room-detail-jack">
        Edit {doc.jackNumber}
      </Button>

      <Modal show={show} onHide={handleClose} id="edit-room-detail-jack-form">
        <Modal.Header closeButton>
          <Modal.Title>Edit Jack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm
            schema={bridge}
            onSubmit={data => submit(data)}
            model={doc}
          >
            <TextField name="jackNumber" id="edit-room-detail-jack-form-jacknumber" />
            <TextField name="wallLocation" id="edit-room-detail-jack-form-walllocation" />
            <TextField name="IDFRoom" label="IDF Room" id="edit-room-detail-jack-form-idfroom" />
            <TextField name="description" id="edit-room-detail-jack-form-description" />
            <Button id="edit-room-detail-jack-form-submit" type="Submit" variant="success">Add</Button>
            <ErrorsField />
            <HiddenField name="roomId" value={doc.roomId} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose} id="edit-room-detail-jack-form-close-button">
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
