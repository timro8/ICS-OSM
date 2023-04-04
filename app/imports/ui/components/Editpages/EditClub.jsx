import React, { useRef, useState } from 'react';
import swal from 'sweetalert';
import { Button, Col, Image, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { updateMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';
import { Clubs } from '../../../api/club/Club';
import { uploadImgUrl } from '../../../api/faculty/faculty_form_helper';

const bridge = new SimpleSchema2Bridge(Clubs._schema);

/* Renders the EditClubs page for editing a single document. */
const EditClub = ({ id }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Clubs documents.
    const subscription = Clubs.subscribeClub();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Clubs.findDoc(id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [id]);

  const imageSubmit = useRef(null);

  let initialImage = 'https://res.cloudinary.com/dmbrfkjk3/image/upload/v1678099354/No-Image-Found-400x264_kyy6b4.png';

  if (doc.image.length > 0) {
    initialImage = doc.image;
  }
  const [selectedImage, setSelectedImage] = useState(initialImage);

  // On successful submit, insert the data.
  const submit = async (data) => {
    let imageUrl = initialImage;
    if (imageSubmit.current !== initialImage) {
      imageUrl = await uploadImgUrl(imageSubmit.current);
      if (doc.image.includes('cloudinary')) {
        Meteor.call('deleteImage', doc.image);
      }
    }
    const { clubName, description, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor } = data;
    const collectionName = Clubs.getCollectionName();
    const updateData = { id: id, clubName, image: imageUrl, description, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Clubs updated successfully', 'success'));
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
    <>
      <Col className="pt-3 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          Edit Club
        </Button>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title className="d-flex justify-content-center">Edit Club</Modal.Title>
        </Modal.Header>
        <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column' }}>
          <Button style={{ background: 'white', borderColor: 'white' }} onClick={handleImageClick}>
            <input id="imageUpload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
            <Image style={{ width: '100%', height: '13rem' }} src={selectedImage} />
          </Button>
        </div>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Modal.Body>
            <TextField name="clubName" />
            <LongTextField name="description" />
            <TextField name="joinLink" />
            <TextField name="meetingDay" />
            <TextField name="meetingTime" />
            <TextField name="meetingLocation" />
            <TextField name="advisor" />
            <Col className="d-flex justify-content-end">
              <SubmitField value="Submit" />
              <ErrorsField />
            </Col>
            <HiddenField name="officers" />
          </Modal.Body>
        </AutoForm>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

EditClub.propTypes = {
  id: PropTypes.string.isRequired,
};
export default EditClub;
