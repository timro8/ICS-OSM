import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, HiddenField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { StaffProfiles } from '../../../api/user/StaffProfileCollection';
import { OccupantRoom } from '../../../api/user/OccupantRoomCollection';
import { Rooms } from '../../../api/room/RoomCollection';
import { defineMethod, updateMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';

// form schema based on the Equipment collection
const formSchema = new SimpleSchema({
  roomKey: String,
  occupant: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddOccupant component for adding a new occupant. */
const AddOccupant = ({ roomKey }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userList, ready, room } = useTracker(() => {
    const subFac = FacultyProfiles.subscribeFacultyProfileAdmin();
    const subStaff = StaffProfiles.subscribeStaffProfileAdmin();
    const subRoom = Rooms.subscribeRoom();
    const subOccupantRoom = OccupantRoom.subscribeOccupantRoomAdmin();
    const docFac = FacultyProfiles.find().fetch();
    const docStaff = StaffProfiles.find().fetch();
    const docRoom = Rooms.find({ roomKey: roomKey }).fetch();
    const docOccupantRoom = OccupantRoom.find({ roomId: docRoom[0]._id }).fetch();
    console.log(docOccupantRoom);
    const rdy = subFac.ready() && subStaff.ready() && subRoom.ready() && subOccupantRoom.ready();
    const allUsers = _.extend([], docFac, docStaff);
    allUsers.sort(function (a, b) {
      return a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName);
    });
    return {
      userList: allUsers,
      room: docRoom,
      ready: rdy,
    };
  });

  const occupantList = userList.map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user.email }));
  // data added to the OccupantRoom collection. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional occupant.
  const submit = (data, formRef) => {
    let collectionName = OccupantRoom.getCollectionName();
    const email = data.occupant;
    const definitionData = { email, roomKey };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        collectionName = Rooms.getCollectionName();
        const occupants = OccupantRoom.find({ roomId: room[0]._id }).fetch();
        const status = 'Occupied';
        const capacity = occupants.length;
        const roomSqFoot = room[0].roomSqFoot;
        const roomClassification = room[0].roomClassification;
        const picture = room[0].picture;
        const updateData = { id: room[0]._id, status, capacity, roomSqFoot, roomClassification, picture };
        updateMethod.callPromise({ collectionName, updateData });
        swal('Success', 'Occupant assigned successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return ready ? (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Add Occupant
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Occupant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Occupant
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <SelectField name="occupant" options={occupantList} />
            <SubmitField value="submit" />
            <ErrorsField />
            <HiddenField name="roomKey" value={roomKey} />
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

AddOccupant.propTypes = {
  roomKey: PropTypes.string.isRequired,
};

export default AddOccupant;
