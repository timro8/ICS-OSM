import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, NumField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Rooms } from '../../api/room/RoomCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from './LoadingSpinner';

// form schema based on the Room collection
const bridge = new SimpleSchema2Bridge(Rooms._schema);

/* Renders the AddRoom component for adding a new room. */
const AddRoom = () => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { faculty, ready } = useTracker(() => {
    const subscription = FacultyProfiles.subscribeFacultyProfileAdmin();
    const rdy = subscription.ready();
    const facultyList = FacultyProfiles.find({}, { sort: { lastName: 1, firstName: 1 } }).fetch();
    return {
      faculty: facultyList,
      ready: rdy,
    };
  });

  const facOccupants = [];
  facOccupants.push({ label: '---', value: '---' });
  faculty.map((fac) => facOccupants.push(({ label: `${fac.firstName} ${fac.lastName}`, value: `${fac.email}` })));

  // data added to the Room collection. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional rooms.
  const submit = (data, formRef) => {
    const { roomKey, roomNumber, location, status, capacity, roomSqFoot, roomClassification, occupants, picture } = data;
    console.log(data);
    const collectionName = Rooms.getCollectionName();
    const definitionData = { roomKey, roomNumber, location, status, capacity, roomSqFoot, roomClassification, occupants, picture };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Room added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return ready ? (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Room
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="roomKey" placeholder="location and room number" />
            <TextField name="roomNumber" />
            <SelectField
              name="location"
              allowedValues={['POST', 'KELLER']}
            />
            <SelectField
              name="status"
              allowedValues={['Occupied', 'Vacant', 'Ouf of Commission', 'Other']}
            />
            <NumField name="capacity" />
            <TextField name="roomSqFoot" />
            <SelectField
              name="roomClassification"
              allowedValues={['Office', 'Sink', 'Conference', 'Cubicle', 'ICS Library', 'ASECOLAB', 'Mail', 'Main Office', 'Lab', 'ICSpace', 'Storage', 'ICS IT', 'OFCSVC', 'LNG']}
            />
            <SelectField name="occupants" options={facOccupants} />
            <TextField name="picture" />
            <SubmitField value="submit" />
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
export default AddRoom;
