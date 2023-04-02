import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Rooms } from '../../api/room/RoomCollection';
import { RoomJacks } from '../../api/room/RoomJacks';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import LoadingSpinner from './LoadingSpinner';

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
const TechAddJack = () => {
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
    const { jackNumber, wallLocation, IDFRoom, description } = data;
    const roomKey = data.rooms;
    console.log(roomKey);
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
  return ready ? (
    <>
      <Button id={COMPONENT_IDS.ADD_TECH_JACK} variant="secondary" size="sm" onClick={handleShow}>
        Add Jack
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Jack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Jack
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} onChange={(key, value) => { setRoom(value); }}>
            <SelectField
              name="rooms"
              options={roomList}
            />
            <TextField name="jackNumber" />
            <TextField name="wallLocation" />
            <TextField name="IDFRoom" label="IDF Room" />
            <TextField name="description" />
            <SubmitField value="submit" />
            <ErrorsField />
            <TextField name="roomId" value={initRoom} />
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

export default TechAddJack;
