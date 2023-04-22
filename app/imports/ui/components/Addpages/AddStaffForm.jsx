import React, { useState, useRef } from 'react';
import { Button, Modal, Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SelectField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { StaffProfiles } from '../../../api/user/StaffProfileCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';
import { uploadImgUrl } from '../../../api/faculty/faculty_form_helper.js';
import { Rooms } from '../../../api/room/RoomCollection';

const AddStaffForm = props => {
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
    phoneNumber: { type: String, optional: true },
    role: {
      type: String,
      allowedValues: ['STAFF', 'TECH'],
      defaultValue: 'STAFF',
    },
    userId: { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const [selectedRoom, setSelectedRoom] = useState([roomNumbers[0]]);

  const [currentRoom, setCurrentRoom] = useState(roomNumbers[0]);

  const [selectedImage, setSelectedImage] = useState('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg');
  const imageSubmit = useRef(null);
  // On submit, insert the data.
  const submit = async (data, formRef) => {
    let imageUrl = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    if (selectedImage !== imageUrl) {
      imageUrl = await uploadImgUrl(imageSubmit.current);
    }
    const { email, firstName, lastName, password, role, image, bio, phoneNumber } = data;
    console.log(data);
    const collectionName = StaffProfiles.getCollectionName();
    const definitionData = { email, firstName, lastName, password, role, image, bio, phoneNumber };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Staff added successfully', 'success');
        formRef.reset();
      });
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
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Add Staff</Modal.Title>
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
                <TextField name="firstName" />
                <TextField name="lastName" />
              </Row>
              <SelectField name="role" />
              <TextField name="email" />
              <TextField name="password" type="password" />
              <LongTextField name="bio" label="Bio (optional)" />
              <TextField name="phoneNumber" label="Phone Number (optional)" />
              <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column', gridColumnGap: '10px' }}>
                <Button onClick={onClose} variant="danger">Cancel</Button>
                <Button type="submit" variant="success">Add</Button>
              </div>
              <ErrorsField />
            </AutoForm>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  ) : <LoadingSpinner />;
};

AddStaffForm.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

AddStaffForm.defaultProps = {
  show: false,
  onClose: null,
};

export default AddStaffForm;
