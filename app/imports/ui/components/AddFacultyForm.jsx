import React, { useState } from 'react';
import { Button, Modal, Badge, CloseButton, FormLabel } from 'react-bootstrap';
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

  function getTime() {
    const arr = [];
    for (let j = 1; j < 24; j++) {
      for (let i = 0; i < 60; i += 5) {
        if (i < 10) {
          arr.push(`${j}:0${i}`);
        } else {
          arr.push(`${j}:${i}`);
        }
      }
    }
    arr.push('--');
    return arr;
  }

  const timeSelection = getTime();

  // getting the rooms
  let roomNumbers = [];
  rooms.map((roomNum) => roomNumbers.push(roomNum.roomNumber));
  roomNumbers = rooms.reduce((acc, room) => {
    if (!acc.includes(room.roomNumber)) {
      acc.push(room.roomNumber);
    }
    return acc;
  }, []);
  roomNumbers.push('--');

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
    },
    phoneNumber: { type: String, optional: true },
    role: {
      type: String,
      allowedValues: ['Professor', 'TA', 'RA', 'GA', 'N/A'],
      defaultValue: 'N/A',
    },
    day: {
      type: String,
      allowedValues: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', '--'],
    },
    startTime: {
      type: String,
      allowedValues: timeSelection,
    },
    endTime: {
      type: String,
      allowedValues: timeSelection,
    },
    userId: { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const [selectedRoom, setSelectedRoom] = useState([roomNumbers[0]]);
  const [currentRoom, setCurrentRoom] = useState(roomNumbers[0]);
  const [currentDay, setDay] = useState('Monday');
  const [currentStartTime, setStartTime] = useState(getTime()[0]);
  const [currentEndTime, setEndTime] = useState(getTime()[1]);
  const [selectedOfficeHours, setSelectedOfficeHours] = useState(['Monday 1:00 - 1:05']);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { image, firstName, lastName, email, password, bio, phoneNumber, role } = data;
    const definitionData = { firstName, lastName, email, password };
    let userImg = image;
    if (userImg === undefined) {
      userImg = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    }
    const facultyDefinitionData = { image: userImg, firstName, lastName, email, room: selectedRoom.toString(), bio, phoneNumber, officeHours: selectedOfficeHours.toString(), owner: Meteor.users().username, role };

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

  const handleRoom = (value) => {
    if (!selectedRoom.includes(value)) {
      setSelectedRoom([...selectedRoom, value]);
      setCurrentRoom(value);
    }
  };

  function putOfficeHours() {
    const time = `${currentDay} ${currentStartTime} - ${currentEndTime}`;
    if (!selectedOfficeHours.includes(time) && currentDay !== '--' && currentStartTime !== '--' && currentEndTime !== '--') {
      setSelectedOfficeHours([...selectedOfficeHours, time]);
    }
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
          {selectedRoom.length > 0 && (
            <div style={{ marginTop: '0px' }}>
              {selectedRoom.map((value, index) => (
                <Badge key={index} className="m-1 p-2" style={{ fontSize: '15px' }}>
                  {value}
                  <CloseButton
                    variant="white"
                    style={{ fontSize: '10px', padding: '5px 7px 5px 2px' }}
                    onClick={() => {
                      setSelectedRoom([...selectedRoom.filter(item => item !== value)]);
                      if (selectedRoom.length <= 1) {
                        setCurrentRoom('--');
                      } else {
                        setCurrentRoom(selectedRoom[selectedRoom.length - 2]);
                      }
                    }}
                  />
                </Badge>
              ))}
            </div>
          )}
          <SelectField name="room" value={currentRoom} onChange={(value) => handleRoom(value)} />
          <SelectField name="role" />
          <TextField name="email" />
          <TextField name="password" type="password" />
          <TextField name="bio" />
          <TextField name="phoneNumber" label="Phone Number (optional)" />
          <FormLabel style={{ color: 'forestgreen' }}>Office Hours:</FormLabel>
          {putOfficeHours()}
          {selectedOfficeHours.length > 0 && (
            <div>
              {selectedOfficeHours.map((value, index) => (
                <Badge key={index} className="m-1 p-2" style={{ fontSize: '15px' }}>
                  {value}
                  <CloseButton
                    variant="white"
                    style={{ fontSize: '10px', padding: '5px 7px 5px 2px' }}
                    onClick={() => {
                      setSelectedOfficeHours([...selectedOfficeHours.filter(item => item.trim() !== value.trim())]);
                      setDay('--');
                      setStartTime('--');
                      setEndTime('--');
                    }}
                  />
                </Badge>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <SelectField style={{ marginRight: '5px' }} name="day" value={currentDay} onChange={(value) => setDay(value)} />
            <SelectField style={{ marginRight: '5px' }} name="startTime" value={currentStartTime} onChange={(value) => setStartTime(value)} />
            <SelectField name="endTime" value={currentEndTime} onChange={(value) => setEndTime(value)} />
          </div>
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
