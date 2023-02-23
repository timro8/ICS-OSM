import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, NumField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from './LoadingSpinner';

// form based on Rooms collection
const bridge = new SimpleSchema2Bridge(Rooms._schema);

const roomStatus = ['Occupied', 'Vacant', 'Out of Commission', 'Other'];

const roomClassifications = ['Office', 'Sink', 'Conference', 'Cubicle', 'ICS Library', 'ASECOLAB', 'Mail', 'Main Office', 'Lab', 'ICSpace', 'Storage', 'ICS IT', 'OFCSVC', 'LNG'];

/* Renders the Edit Room. */
const EditRoom = ({ roomKey }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // subscriptions and ready
  const { doc, ready } = useTracker(() => {
    // Get access to RoomEquipments documents (Admin).
    const subscription = Rooms.subscribeRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document based on the equipmentId
    const document = Rooms.findDoc(roomKey);
    return {
      doc: document,
      ready: rdy,
    };
  }, [roomKey]);

  // data submitted to edit an equipment. If there are errors, an error message will pop up. If the data is successfully updated, a success message will appear.
  const submit = (data) => {
    const { status, capacity, roomSqFoot, roomClassification, picture } = data;
    const collectionName = Rooms.getCollectionName();
    const updateData = { id: _id, status, capacity, roomSqFoot, roomClassification, picture};
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Room updated successfully', 'success'));
  };

  return ready ? (
    <>
      <Button onClick={handleShow}>
        Edit {doc.roomNumber}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit ${doc.location} ${doc.roomNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <SelectField name="status" allowedValues={roomStatus} />
            <NumField name="capacity" decimal={null} />
            <TextField name="roomSqFoot" />
            <TextField name="picture" />
            <SubmitField value="Submit" />
            <ErrorsField />
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

EditRoom.propTypes = {
  roomKey: PropTypes.string.isRequired,
};

export default EditRoom;
