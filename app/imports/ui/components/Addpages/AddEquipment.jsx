import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SelectField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Plus } from 'react-bootstrap-icons';
import { Rooms } from '../../../api/room/RoomCollection';
import { RoomEquipments } from '../../../api/room/RoomEquipments';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';
import CircleButton from '../CircleButton';

// form schema based on the RoomJacks collection.
const formSchema = new SimpleSchema({
  roomId: {
    type: String,
    optional: true,
  },
  rooms: {
    type: String,
    optional: true,
  },
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
    defaultValue: 'furniture',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddRoomEquipment component for adding a new equipment. */
const AddEquipment = () => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);
  const [initRoom, setRoom] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { rooms, ready } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    const rdy = subscription.ready();
    const roomItems = Rooms.find({}).fetch();
    return {
      rooms: roomItems,
      ready: rdy,
    };
  }, []);
  const roomList = rooms.map((room) => ({ label: room.roomNumber, value: room.roomKey }));
  // data submitted to add a new jack. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional jacks.
  const submit = (data, formRef) => {
    const { description, quantity, serialNumber, assetTag, equipmentType } = data;
    const roomKey = data.rooms;
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
  return ready ? (
    <>
      <CircleButton onClick={handleShow} variant="dark" id="add-equipment" tooltip="Add Equipment">
        <Plus fontSize="25px" id="add-equipment" />
      </CircleButton>
      <Modal show={show} onHide={handleClose} id="add-equipment-form">
        <Modal.Header closeButton>
          <Modal.Title>Add Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Equipment
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} onChange={(key, value) => { setRoom(value); }}>
            <SelectField
              name="rooms"
              options={roomList}
              id="add-equipment-form-rooms"
            />
            <TextField name="quantity" id="add-equipment-form-quantity" />
            <TextField name="description" id="add-equipment-form-description" />
            <TextField name="serialNumber" id="add-equipment-form-serialnumber" />
            <TextField name="assetTag" id="add-equipment-form-assettag" />
            <SelectField name="equipmentType" id="add-equipment-form-equipmenttype" />
            <Button type="submit" id="add-equipment-form-submit" variant="success">Add</Button>
            <ErrorsField />
            <HiddenField name="roomId" value={initRoom} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            id="add-equipment-form-close-button"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

export default AddEquipment;
