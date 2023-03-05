import React, { useRef, useState } from 'react';
import {Button, Image, Modal} from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, NumField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Rooms } from '../../api/room/RoomCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { uploadImgUrl } from '../../startup/client/uploadImg';

// form schema based on the Room collection
const bridge = new SimpleSchema2Bridge(Rooms._schema);

/* Renders the AddRoom component for adding a new room. */
const AddRoom = () => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageSubmit = useRef(null);

  const [selectedImage, setSelectedImage] = useState('https://www.cis.hawaii.edu/wp-content/uploads/2019/07/post127_a-470x140.jpg');

  // data added to the Room collection. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional rooms.
  const submit = async (data, formRef) => {
    const imageUrl = await uploadImgUrl(imageSubmit.current);
    const { roomKey, roomNumber, location, status, capacity, roomSqFoot, roomClassification } = data;
    const collectionName = Rooms.getCollectionName();
    const definitionData = { roomKey, roomNumber, location, status, capacity, roomSqFoot, roomClassification, picture: imageUrl };

    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Room added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;

  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    imageSubmit.current = file;
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Button id={COMPONENT_IDS.ADD_ROOM} variant="primary" onClick={handleShow}>
        Add Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column' }}>
            <Button style={{ background: 'white', borderColor: 'white' }} onClick={handleImageClick}>
              <input id="imageUpload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
              <Image style={{ width: '100%', height: '13rem' }} src={selectedImage} />
            </Button>
          </div>
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
  );
};
export default AddRoom;
