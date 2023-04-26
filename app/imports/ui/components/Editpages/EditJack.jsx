import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { Rooms } from '../../../api/room/RoomCollection';
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

/* Renders the edit jack. */
const EditJack = ({ jackId }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);
  const [initRoom, setRoom] = useState(0);
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

  // const roomList = _.pluck(docRooms, 'roomNumber');
  const roomList = docRooms.map((room) => ({ label: room.roomNumber, value: room._id }));

  const formSchema = makeSchema;
  const bridge = new SimpleSchema2Bridge(formSchema);
  // data submitted to update a jack. If there are errors, an error message will appear. If the data successfully updates, a success message appears.
  const submit = (data) => {
    const { jackNumber, wallLocation, IDFRoom, description } = data;
    const roomId = data.rooms;
    const collectionName = RoomJacks.getCollectionName();
    const updateData = { id: jackId, roomId, jackNumber, wallLocation, IDFRoom, description };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Jack updated successfully', 'success'));
  };

  return ready ? (
    <>
      <Button id={COMPONENT_IDS.EDIT_TECH_JACK} variant="outline-secondary" size="sm" onClick={handleShow}>
        Edit {doc.jackNumber}
      </Button>

      <Modal show={show} onHide={handleClose} id="edit-tech-jack">
        <Modal.Header closeButton>
          <Modal.Title>Edit Jack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm
            schema={bridge}
            onSubmit={data => submit(data)}
            model={doc}
            onChange={(key, value) => {
              setRoom(value);
            }}
          >
            <TextField name="jackNumber" />
            <SelectField
              name="rooms"
              options={roomList}
            />
            <TextField name="wallLocation" />
            <TextField name="IDFRoom" label="IDF Room" />
            <TextField name="description" />
            <SubmitField value="Submit" />
            <ErrorsField />
            <HiddenField name="roomId" value={initRoom} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
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
