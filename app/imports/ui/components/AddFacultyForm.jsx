import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from './LoadingSpinner';

const AddFacultyForm = props => {

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { rooms, ready } = useTracker(() => {
    // Get access to Room documents.
    const subscription = Rooms.subscribeRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Room documents
    const items = Rooms.find({}).fetch();
    return {
      rooms: items,
      ready: rdy,
    };
  }, []);

  // getting the rooms
  const roomNumbers = [];
  rooms.map((roomNum) => roomNumbers.push(roomNum.roomNumber));

  // Create a schema to specify the structure of the data to appear in the form.
  const formSchema = new SimpleSchema({
    image: { type: String, optional: true },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    bio: String,
    room: {
      type: String,
      allowedValues: roomNumbers,
      defaultValue: roomNumbers[0],
    },
    phoneNumber: { type: String, optional: true },
    officeHours: String,
    role: {
      type: String,
      allowedValues: ['PROFESSOR', 'TA', 'RA', 'N/A'],
      defaultValue: 'N/A',
    },
    userId: { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { image, firstName, lastName, email, password, room, bio, phoneNumber, officeHours, role } = data;
    const definitionData = { firstName, lastName, email, password };
    let userImg = image;
    if (userImg === undefined) {
      userImg = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    }
    const facultyDefinitionData = { image: userImg, firstName, lastName, email, room, bio, phoneNumber, officeHours, owner: email, role };

    Meteor.call(
      'insertFaculty',
      facultyDefinitionData,
      definitionData,
      (err) => {
        if (err) {
          console.log(err.message);
          swal('Error', err.message, 'error');
        }
        swal('Success', 'Faculty added successfully', 'success');
      },
    );

    formRef.reset();
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;

  // determine whether open or close this modal
  const { show, onClose } = props;
  if (!show) {
    return null;
  }

  // pop up window: https://react-bootstrap.github.io/components/modal/
  return ready ? (
    <Modal show={show}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Add Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <TextField name="firstName" />
          <TextField name="lastName" />
          <SelectField name="room" />
          <SelectField name="role" />
          <TextField name="email" />
          <TextField name="password" />
          <TextField name="bio" />
          <TextField name="phoneNumber" label="Phone Number (optional)" />
          <TextField name="officeHours" label="Office Hours" />
          <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column', gridColumnGap: '10px' }}>
            <Button onClick={onClose} variant="danger">Cancel</Button>
            <Button type="submit" variant="success">Add</Button>
          </div>
          <ErrorsField />
        </AutoForm>
      </Modal.Body>
    </Modal>
  ) : <LoadingSpinner />;
};

AddFacultyForm.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

AddFacultyForm.defaultProps = {
  show: false,
  onClose: null,
};

export default AddFacultyForm;
