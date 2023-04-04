import React, { useRef, useState } from 'react';
import swal from 'sweetalert';
import { Badge, Button, CloseButton, Col, FormLabel, Image, Modal } from 'react-bootstrap';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  LongTextField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ROLE } from '../../api/role/Role';
import { getTimeSelection, uploadImgUrl } from '../../api/faculty/faculty_form_helper';

/* Renders the EditFaculty page for editing a single document. */
const EditFacultyProfile = ({ id }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription = FacultyProfiles.subscribeFacultyProfile();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = FacultyProfiles.findDoc(id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [id]);
  console.log(doc);
  // Create a schema to specify the structure of the data to appear in the form.
  const formSchema = new SimpleSchema({
    image: { type: String, optional: true },
    firstName: String,
    lastName: String,
    email: String,
    bio: {
      type: String,
      optional: true,
    },
    room: {
      type: String,
      optional: true,
    },
    phoneNumber: { type: String, optional: true },
    day: {
      type: String,
      allowedValues: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', '--'],
      defaultValue: '--',
    },
    startTime: {
      type: String,
      allowedValues: getTimeSelection(),
      defaultValue: '--',
    },
    endTime: {
      type: String,
      allowedValues: getTimeSelection(),
      defaultValue: '--',
    },
    userId: { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  let initialImage = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

  if (doc.image.length > 0) {
    initialImage = doc.image;
  }

  const [selectedImage, setSelectedImage] = useState(initialImage);
  const imageSubmit = useRef(doc.image);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');
  const [currentDay, setDay] = useState('--');
  const [currentStartTime, setStartTime] = useState('--');
  const [currentEndTime, setEndTime] = useState('--');
  let tmp = [];
  if (doc.officeHours !== undefined) {
    tmp = doc.officeHours.split(',');
  }
  const [selectedOfficeHours, setSelectedOfficeHours] = useState(tmp);
  tmp = [];
  if (doc.phoneNumber !== undefined) {
    tmp = doc.phoneNumber.split(',');
  }
  const [phoneNumber, setPhoneNumber] = useState(tmp);

  // On successful submit, insert the data.
  const submit = async (data) => {
    let imageUrl = initialImage;
    if (imageSubmit.current !== initialImage) {
      imageUrl = await uploadImgUrl(imageSubmit.current);
      if (doc.image.includes('cloudinary')) {
        Meteor.call('deleteImage', doc.image);
      }
    }
    const { firstName, lastName, bio } = data;
    const collectionName = FacultyProfiles.getCollectionName();
    const updateData = { id: id, image: imageUrl, firstName, lastName, bio, rooms: doc.rooms, phoneNumber: phoneNumber.toString(), officeHours: selectedOfficeHours.toString() };

    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Faculty Profile updated successfully', 'success'));
  };

  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    imageSubmit.current = file;
    setSelectedImage(URL.createObjectURL(file));
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

  return ready ? (
    <>
      <Col className="d-flex justify-content-center">
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) || doc.email === Meteor.user().username ? (
          <Button key={Math.random()} style={{ width: '7rem' }} variant="primary" onClick={handleShow}>
            Edit Profile
          </Button>
        ) : ''}
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title className="d-flex justify-content-center">Edit Faculty Profile</Modal.Title>
        </Modal.Header>
        <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column' }}>
          <Button style={{ background: 'white', borderColor: 'white' }} onClick={handleImageClick}>
            <input id="imageUpload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
            <Image style={{ borderRadius: '100%', width: '13rem', height: '13rem' }} src={selectedImage} />
          </Button>
        </div>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Modal.Body>
            <TextField name="firstName" />
            <TextField name="lastName" />
            <LongTextField name="bio" />
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
            <TextField name="phoneNumber" label="Phone Number (optional)" value={currentPhoneNumber} onChange={(value) => { handlePhoneNumber(value); }} />
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
            <Col className="d-flex justify-content-end">
              <SubmitField value="Submit" />
              <ErrorsField />
            </Col>
            <HiddenField name="room" />
            <HiddenField name="email" />
          </Modal.Body>
        </AutoForm>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

EditFacultyProfile.propTypes = {
  id: PropTypes.string.isRequired,
};
export default EditFacultyProfile;
