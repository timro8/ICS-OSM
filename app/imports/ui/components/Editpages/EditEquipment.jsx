import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, NumField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { RoomEquipments } from '../../../api/room/RoomEquipments';
import { updateMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';

// form based on RoomEquipments collection
const bridge = new SimpleSchema2Bridge(RoomEquipments._schema);

/* Renders the AddNote component for adding a new note. */
const EditEquipment = ({ equipmentId }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // subscriptions and ready
  const { doc, ready } = useTracker(() => {
    // Get access to RoomEquipments documents (Admin).
    const subscription = RoomEquipments.subscribeRoomEquipmentAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document based on the equipmentId
    const document = RoomEquipments.findDoc(equipmentId);
    return {
      doc: document,
      ready: rdy,
    };
  }, [equipmentId]);

  // data submitted to edit an equipment. If there are errors, an error message will pop up. If the data is successfully updated, a success message will appear.
  const submit = (data) => {
    const { description, quantity, serialNumber, assetTag } = data;
    const collectionName = RoomEquipments.getCollectionName();
    const updateData = { id: equipmentId, description, quantity, serialNumber, assetTag };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Equipment updated successfully', 'success'));
  };

  return ready ? (
    <>
      <Button variant="outline-secondary" size="sm" onClick={handleShow}>
        Edit {doc.description}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <TextField name="description" />
            <NumField name="quantity" decimal={null} />
            <TextField name="serialNumber" />
            <TextField name="assetTag" />
            <SubmitField value="Submit" />
            <ErrorsField />
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

EditEquipment.propTypes = {
  equipmentId: PropTypes.string.isRequired,
};

export default EditEquipment;
