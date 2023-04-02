import React, { useRef, useState } from 'react';
import swal from 'sweetalert';
import { Button, Col, Image, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ROLE } from '../../api/role/Role';
import { uploadImgUrl } from '../../startup/client/uploadImg.js';

const bridge = new SimpleSchema2Bridge(FacultyProfiles._schema);

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

  let initialImage = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

  if (doc.image.length > 0) {
    initialImage = doc.image;
  }
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const imageSubmit = useRef(doc.image);

  // On successful submit, insert the data.
  const submit = async (data) => {
    let imageUrl = initialImage;
    if (imageSubmit.current !== initialImage) {
      imageUrl = await uploadImgUrl(imageSubmit.current);
    }
    const { firstName, lastName, bio, rooms, phoneNumber, officeHours } = data;
    const collectionName = FacultyProfiles.getCollectionName();
    const updateData = { id: id, image: imageUrl, firstName, lastName, bio, rooms, phoneNumber, officeHours };
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
            <TextField name="phoneNumber" />
            <LongTextField name="officeHours" />
            <Col className="d-flex justify-content-end">
              <SubmitField value="Submit" />
              <ErrorsField />
            </Col>
            <HiddenField name="rooms" />
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
