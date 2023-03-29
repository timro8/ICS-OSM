import React, { useState, useRef } from 'react';
import { Button, Modal, Badge, CloseButton, FormLabel, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from './LoadingSpinner';
import { uploadImgUrl } from '../../startup/client/uploadImg.js';

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
    bio: {
      type: String,
      optional: true,
    },
    room: {
      type: String,
      allowedValues: roomNumbers,
      optional: true,
    },
    phoneNumber: { type: String, optional: true },
    role: {
      type: String,
      allowedValues: ['PROFESSOR', 'ASSISTANT PROFESSOR', 'ASSOCIATE PROFESSOR', 'PROFESSOR EMERITUS', 'TA', 'RA', 'N/A'],
      defaultValue: 'N/A',
    },
    day: {
      type: String,
      allowedValues: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', '--'],
      defaultValue: '--',
    },
    startTime: {
      type: String,
      allowedValues: timeSelection,
      defaultValue: '--',
    },
    endTime: {
      type: String,
      allowedValues: timeSelection,
      defaultValue: '--',
    },
    userId: { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const [selectedRoom, setSelectedRoom] = useState([roomNumbers[0]]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(roomNumbers[0]);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');
  const [currentDay, setDay] = useState('--');
  const [currentStartTime, setStartTime] = useState('--');
  const [currentEndTime, setEndTime] = useState('--');
  const [selectedOfficeHours, setSelectedOfficeHours] = useState([]);
  const [selectedImage, setSelectedImage] = useState('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg');
  const imageSubmit = useRef(null);
  // On submit, insert the data.
  const submit = async (data, formRef) => {
    let imageUrl = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    if (selectedImage !== imageUrl) {
      imageUrl = await uploadImgUrl(imageSubmit.current);
    }
    Meteor.call(
      'insertFaculty',
      data,
      selectedRoom,
      selectedOfficeHours,
      imageUrl,
      (err) => {
        if (err) {
          console.log(err.message);
          swal('Error', err.message, 'error');
        } else {
          swal('Success', 'Faculty added successfully', 'success');
        }
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
    if (!selectedRoom.includes(value) && value !== undefined && value !== '--') {
      setSelectedRoom([...selectedRoom, value]);
      setCurrentRoom(value);
    }
  };

  const handlePhoneNumber = (value) => {
    if (!phoneNumber.includes(value) && value !== undefined && value.length >= 10) {
      setPhoneNumber([...phoneNumber, value]);
    }
    setCurrentPhoneNumber('');
  };

  function putOfficeHours() {
    const time = `${currentDay} ${currentStartTime} - ${currentEndTime}`;
    if (!selectedOfficeHours.includes(time) && currentDay !== '--' && currentStartTime !== '--' && currentEndTime !== '--') {
      if (!(selectedOfficeHours.map((existOfficeHour) => !existOfficeHour.includes(`${currentDay} ${currentStartTime}`))).includes(false)) {
        if (currentStartTime > currentEndTime) {
          swal('Error', 'End time cannot be earlier than start time.', 'error');
        } else {
          setSelectedOfficeHours([...selectedOfficeHours, time]);
          setDay('--');
          setStartTime('--');
          setEndTime('--');
        }
      } else if (currentDay !== '' && currentStartTime !== '' && currentEndTime !== '' && selectedOfficeHours.length < 1) {
        setSelectedOfficeHours([...selectedOfficeHours, time]);
      }
    }
  }

  function removeOfficeHours(value) {
    if (selectedOfficeHours.includes(value)) {
      const updatedOfficeHours = selectedOfficeHours.filter((hour) => hour !== value);
      setSelectedOfficeHours(updatedOfficeHours);
    }
    if (selectedOfficeHours.length < 1) {
      setDay('--');
      setStartTime('--');
      setEndTime('--');
    }
  }

  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    imageSubmit.current = file;
    setSelectedImage(URL.createObjectURL(file));
  };

  // pop up window: https://react-bootstrap.github.io/components/modal/
  return ready ? (
    <Modal show={show}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Add Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column' }}>
          <Button style={{ background: 'white', borderColor: 'white' }} onClick={handleImageClick}>
            <input id="imageUpload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
            <Image style={{ borderRadius: '100%', width: '13rem', height: '13rem' }} src={selectedImage} />
          </Button>
        </div>
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
          <TextField name="bio" label="Bio (optional)" />
          {phoneNumber.length > 0 && (
            <div>
              {phoneNumber.map((value, index) => (
                <Badge key={index} className="m-1 p-2" style={{ fontSize: '15px' }}>
                  {value}
                  <CloseButton variant="white" style={{ fontSize: '10px', padding: '5px 7px 5px 2px' }} onClick={() => { setPhoneNumber([...phoneNumber.filter(item => item !== value)]); }} />
                </Badge>
              ))}
            </div>
          )}
          <TextField name="phoneNumber" label="Phone Number (optional)" value={currentPhoneNumber} onChange={(value) => { handlePhoneNumber(value); setCurrentPhoneNumber(value); }} />
          <FormLabel>Office Hours (optional) :</FormLabel>
          {putOfficeHours()}
          {selectedOfficeHours.length > 0 && (
            <div>
              {selectedOfficeHours.map((value, index) => (
                <Badge key={index} className="m-1 p-2" style={{ fontSize: '15px' }}>
                  {value}
                  <CloseButton
                    variant="white"
                    style={{ fontSize: '10px', padding: '5px 7px 5px 2px' }}
                    onClick={() => { removeOfficeHours(value); }}
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
