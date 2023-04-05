import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Col, Row, Button, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/room/RoomCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { uploadImgUrl } from '../../api/faculty/faculty_form_helper';

// form based on Rooms collection
const bridge = new SimpleSchema2Bridge(Rooms._schema);

const statusList = ['Occupied', 'Vacant', 'Out of Commission', 'Other'];

const classificationList = ['Office', 'Sink', 'Conference', 'Cubicle', 'ICS Library', 'ASECOLAB', 'Mail', 'Main Office', 'Lab', 'ICSpace', 'Storage', 'ICS IT', 'OFCSVC', 'LNG'];

/* Renders the Edit Room. */
const EditRoom = () => {
  const { _id } = useParams();
  // subscriptions and ready
  const { doc, ready } = useTracker(() => {
    // Get access to RoomEquipments documents (Admin).
    const subscription = Rooms.subscribeRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document based on the equipmentId
    const document = Rooms.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const imageSubmit = useRef(doc.picture);

  let initialImage = 'https://res.cloudinary.com/dmbrfkjk3/image/upload/v1678099354/No-Image-Found-400x264_kyy6b4.png';

  if (doc.picture.length > 0) {
    initialImage = doc.picture;
  }
  const [selectedImage, setSelectedImage] = useState(initialImage);

  // data submitted to edit a room. If there are errors, an error message will pop up. If the data is successfully updated, a success message will appear.
  const submit = async (data) => {
    let imageUrl = initialImage;
    if (imageSubmit.current !== initialImage) {
      imageUrl = await uploadImgUrl(imageSubmit.current);
      if (doc.picture.includes('cloudinary')) {
        Meteor.call('deleteImage', doc.picture);
      }
    }
    const { status, capacity, roomSqFoot, roomClassification } = data;
    const collectionName = Rooms.getCollectionName();
    const updateData = { id: _id, status, capacity, roomSqFoot, roomClassification, picture: imageUrl };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Room updated successfully', 'success'));
  };

  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    imageSubmit.current = file;
    setSelectedImage(URL.createObjectURL(file));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_ROOM} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Room: {doc.roomNumber}</h2>
          </Col>
          <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column' }}>
            <Button style={{ background: 'white', borderColor: 'white' }} onClick={handleImageClick}>
              <input id="imageUpload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
              <Image style={{ width: '100%', height: '13rem' }} src={selectedImage} />
            </Button>
          </div>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <SelectField name="status" allowedValues={statusList} />
            <NumField name="capacity" decimal={null} />
            <TextField name="roomSqFoot" />
            <SelectField name="roomClassification" allowedValues={classificationList} />
            <SubmitField value="Submit" />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Room details" />;
};

export default EditRoom;
