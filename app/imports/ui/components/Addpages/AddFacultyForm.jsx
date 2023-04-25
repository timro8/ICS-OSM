import React, { useState, useRef } from 'react';
import { Button, Modal, Badge, CloseButton, FormLabel, Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SelectField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../LoadingSpinner';
import { getTimeSelection, uploadImgUrl } from '../../../api/faculty/faculty_form_helper.js';
import { Rooms } from '../../../api/room/RoomCollection';

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
  let roomNumbers = [];
  rooms.map((roomNum) => roomNumbers.push(roomNum.roomNumber));
  roomNumbers = rooms.reduce((acc, room) => {
    if (!acc.includes(room.roomNumber)) {
      acc.push(room.roomNumber);
    }
    return acc;
  }, []);
  roomNumbers.push('--');

  const timeSelection = getTimeSelection();

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
      phoneNumber,
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

  const removeNARoom = () => {
    if (selectedRoom.includes('n/a') && selectedRoom.length > 1) {
      const updatedRoom = selectedRoom.filter((room) => room !== 'n/a');
      setSelectedRoom(updatedRoom);
    }
  };

  const handlePhoneNumber = (value) => {
    if (value !== undefined && value.length === 12) {
      if (!phoneNumber.includes(value)) {
        setPhoneNumber([...phoneNumber, value]);
      }
      setCurrentPhoneNumber('');
    } else if (value !== undefined) {
      const numericValue = value.replace(/\D/g, '');
      let formattedValue = '';

      for (let i = 0; i < numericValue.length; i++) {
        if (i > 0 && i % 3 === 0) {
          formattedValue += '-';
        }
        formattedValue += numericValue[i];
      }

      setCurrentPhoneNumber(formattedValue);
    }
  };

  function putOfficeHours() {
    const time = `${currentDay} ${currentStartTime} - ${currentEndTime}`;

    if (currentDay === '--' || currentStartTime === '--' || currentEndTime === '--') {
      return;
    }

    let error = false;
    const error_message = [];

    const givenStartTime = new Date();
    givenStartTime.setHours(parseInt(currentStartTime.split(':')[0], 10));
    givenStartTime.setMinutes(parseInt(currentStartTime.split(':')[1], 10));

    const givenEndTime = new Date();
    givenEndTime.setHours(parseInt(currentEndTime.split(':')[0], 10));
    givenEndTime.setMinutes(parseInt(currentEndTime.split(':')[1], 10));

    if (givenEndTime <= givenStartTime) {
      error = true;
      error_message.push('End time cannot be same or earlier than start time.');
    }

    if (selectedOfficeHours.length > 0) {
      for (let i = 0; i < selectedOfficeHours.length; i++) {
        const selectedDay = selectedOfficeHours[i].split(' ')[0];
        const selectedStart = selectedOfficeHours[i].split(' ')[1];
        const selectedEnd = selectedOfficeHours[i].split(' ')[3];

        if (selectedDay === currentDay) {
          const givenStart = new Date();
          givenStart.setHours(parseInt(selectedStart.split(':')[0], 10));
          givenStart.setMinutes(parseInt(selectedStart.split(':')[1], 10));
          const givenEnd = new Date();
          givenEnd.setHours(parseInt(selectedEnd.split(':')[0], 10));
          givenEnd.setMinutes(parseInt(selectedEnd.split(':')[1], 10));

          if ((givenStart <= givenStartTime && givenStartTime <= givenEnd) || (givenStart <= givenEndTime && givenEndTime <= givenEnd)) {
            error = true;
            error_message.push('The selected office hours overlap with previously selected hours. Please select a different time.');
            break;
          }
        }

      }
    }

    if (error) {
      swal('Warning', error_message.toString());
      return;
    }

    setSelectedOfficeHours([...selectedOfficeHours, time]);
    setDay('--');
    setStartTime('--');
    setEndTime('--');
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
    <Modal show={show} size="xl">
      <Modal.Header id="close-add-faculty-form" closeButton onClick={onClose}>
        <Modal.Title>Add Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row xs="1" md="1" xl="2">
          <Col xl={4}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Button style={{ background: 'white', borderColor: 'white' }} onClick={handleImageClick}>
                <input id="imageUpload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
                <Image style={{ borderRadius: '100%', width: '18rem', height: '18rem' }} src={selectedImage} />
              </Button>
            </div>
          </Col>
          <Col xl="auto" style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Row xs="1" md="2" xl="2">
                <TextField id="add-faculty-first-name" name="firstName" />
                <TextField id="add-faculty-last-name" name="lastName" />
              </Row>
              {removeNARoom()}
              {selectedRoom.length > 0 && (
                <div style={{ marginTop: '0px' }} className="badges">
                  {selectedRoom.map((value, index) => (
                    <Badge key={index} className="m-1 p-2" style={{ fontSize: '15px' }}>
                      {value}
                      <CloseButton
                        variant="white"
                        className="badges-close-button"
                        onClick={() => {
                          setSelectedRoom([...selectedRoom.filter(item => item !== value)]);
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <SelectField id="add-faculty-room" name="room" label="Room (optional)" value={currentRoom} onChange={(value) => handleRoom(value)} />
              <SelectField id="add-faculty-role" name="role" />
              <TextField id="add-faculty-email" name="email" />
              <TextField id="add-faculty-password" name="password" type="password" />
              <LongTextField id="add-faculty-bio" name="bio" label="Bio (optional)" />
              {phoneNumber.length > 0 && (
                <div className="badges">
                  {phoneNumber.map((value, index) => (
                    <Badge key={index} className="m-1 p-2" style={{ fontSize: '15px' }}>
                      {value}
                      <CloseButton variant="white" className="badges-close-button" onClick={() => { setPhoneNumber([...phoneNumber.filter(item => item !== value)]); }} />
                    </Badge>
                  ))}
                </div>
              )}
              <TextField id="add-faculty-phone" name="phoneNumber" label="Phone Number (optional)" value={currentPhoneNumber} onChange={(value) => { handlePhoneNumber(value); }} />
              <FormLabel>Office Hours (optional) :</FormLabel>
              {putOfficeHours()}
              {selectedOfficeHours.length > 0 && (
                <div className="badges">
                  {selectedOfficeHours.map((value, index) => (
                    <Badge key={index} className="m-1 p-2">
                      {value}
                      <CloseButton
                        className="badges-close-button"
                        variant="white"
                        onClick={() => { removeOfficeHours(value); }}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <SelectField id="add-faculty-day" style={{ marginRight: '5px' }} name="day" value={currentDay} onChange={(value) => setDay(value)} />
                <SelectField id="add-faculty-start-time" style={{ marginRight: '5px' }} name="startTime" value={currentStartTime} onChange={(value) => setStartTime(value)} />
                <SelectField id="add-faculty-end-time" name="endTime" value={currentEndTime} onChange={(value) => setEndTime(value)} />
              </div>
              <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column', gridColumnGap: '10px' }}>
                <Button onClick={onClose} variant="danger">Cancel</Button>
                <Button id="add-faculty-submit" type="submit" variant="success">Add</Button>
              </div>
              <ErrorsField />
            </AutoForm>
          </Col>
        </Row>
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
