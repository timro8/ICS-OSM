import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { RoomEquipments } from '../../api/room/RoomEquipments';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const formSchema = new SimpleSchema({
  roomId: String,
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
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddNote component for adding a new note. */
const AddEquipment = ({ roomId, owner }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (data, formRef) => {
    const { description, quantity, serialNumber, assetTag } = data;
    const collectionName = RoomEquipments.getCollectionName();
    const definitionData = { roomId, description, quantity, serialNumber, assetTag, owner };
    console.log(definitionData);
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddEquipment.propTypes = {
  roomId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default AddEquipment;
