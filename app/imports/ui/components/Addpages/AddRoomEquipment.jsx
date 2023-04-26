import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, HiddenField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Plus } from 'react-bootstrap-icons';
import { RoomEquipments } from '../../../api/room/RoomEquipments';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import CircleButton from '../CircleButton';

// form schema based on the Equipment collection
const formSchema = new SimpleSchema({
  roomKey: String,
  description: String,
  quantity: Number,
  serialNumber: {
    type: String,
    optional: true,
  },
  assetTag: {
    type: String,
    optional: true,
  },
  equipmentType: {
    type: String,
    optional: true,
    allowedValues: ['furniture', 'tech'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddRoomEquipment component for adding a new equipment. */
const AddRoomEquipment = ({ roomKey }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // data added to the RoomEquipments collection. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional equipment.
  const submit = (data, formRef) => {
    const { description, quantity, serialNumber, assetTag, equipmentType } = data;
    const collectionName = RoomEquipments.getCollectionName();
    const definitionData = { roomKey, description, quantity, serialNumber, assetTag, equipmentType };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Equipment added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <>
      <CircleButton onClick={handleShow} variant="dark" id="add-room-equipment">
        <Plus fontSize="25px" id="add-room-equipment" />
      </CircleButton>

      <Modal show={show} onHide={handleClose} id="add-room-equipment-form">
        <Modal.Header closeButton>
          <Modal.Title>Add Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Equipment
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="description" id="add-room-equipment-form-description" />
            <TextField name="quantity" id="add-room-equipment-form-quantity" />
            <TextField name="serialNumber" id="add-room-equipment-form-serialnumber" />
            <TextField name="assetTag" id="add-room-equipment-form-assettag" />
            <SelectField name="equipmentType" id="add-room-equipment-form-equipmenttype" />
            <Button type="submit" id="add-room-equipment-form-submit" variant="success">Add</Button>
            <ErrorsField />
            <HiddenField name="roomKey" value={roomKey} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} id="add-room-equipment-form-close-button">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddRoomEquipment.propTypes = {
  roomKey: PropTypes.string.isRequired,
};

export default AddRoomEquipment;
