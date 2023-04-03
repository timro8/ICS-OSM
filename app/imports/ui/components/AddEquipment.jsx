import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { RoomEquipments } from '../../api/room/RoomEquipments';
import { defineMethod } from '../../api/base/BaseCollection.methods';

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

/* Renders the AddEquipment component for adding a new equipment. */
const AddEquipment = ({ roomKey }) => {
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
      <Button variant="primary" onClick={handleShow}>
        Add Equipment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Equipment
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="description" />
            <TextField name="quantity" />
            <TextField name="serialNumber" />
            <TextField name="assetTag" />
            <SelectField name="equipmentType" />
            <SubmitField value="submit" />
            <ErrorsField />
            <TextField name="roomKey" value={roomKey} />
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

AddEquipment.propTypes = {
  roomKey: PropTypes.string.isRequired,
};

export default AddEquipment;
