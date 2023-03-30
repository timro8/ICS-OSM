import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Button, Modal } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import { RoomJacks } from '../../api/room/RoomJacks';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from './LoadingSpinner';

// form schema based on RoomJacks collection schema
const makeSchema = (roomList) => new SimpleSchema({
  roomId: {
    type: String,
    optional: true,
  },
  rooms: {
    type: String,
    optional: true,
    label: 'Room',
    allowedValues: roomList,
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
  const { doc, docRooms, ready } = useTracker(() => {
    // Get access to RoomJacks documents.
    const subscription = RoomJacks.subscribeRoomJacksAdmin();
    const subRoom = Rooms.subscribeRoom();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subRoom.ready();
    // Get the document based on the jackId
    const document = RoomJacks.findDoc(jackId);
    const documentRooms = Rooms.find().fetch();
    return {
      doc: document,
      docRooms: documentRooms,
      ready: rdy,
    };
  }, [jackId]);

  const roomList = _.pluck(docRooms, 'roomNumber');
  const formSchema = makeSchema(roomList);
  const bridge = new SimpleSchema2Bridge(formSchema);
  // data submitted to update a jack. If there are errors, an error message will appear. If the data successfully updates, a success message appears.
  const submit = (data) => {
    const { jackNumber, roomId, wallLocation, IDFRoom, description } = data;
    const collectionName = RoomJacks.getCollectionName();
    const updateData = { id: jackId, roomId, jackNumber, wallLocation, IDFRoom, description };
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
            <SelectField name="rooms" />
            <TextField name="wallLocation" />
            <TextField name="IDFRoom" label="IDF Room" />
            <TextField name="description" />
            <SubmitField value="Submit" />
            <ErrorsField />
            <TextField name="roomId" />
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
