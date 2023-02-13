import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Col, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { Faculties } from '../../api/faculty/FacultyCollection';

const bridge = new SimpleSchema2Bridge(Faculties._schema);

/* Renders the EditFaculty page for editing a single document. */
const EditFacultyProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription = Faculties.subscribeFaculty();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Faculties.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { image, firstName, lastName, bio, room, phoneNumber, officeHours } = data;
    const collectionName = Faculties.getCollectionName();
    const updateData = { id: _id, image, firstName, lastName, bio, room, phoneNumber, officeHours };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Faculty Profile updated successfully', 'success'));
  };

  return ready ? (
    <>
      <Col className="pt-3 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          Edit Profile
        </Button>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title className="d-flex justify-content-center">Edit Faculty Profile</Modal.Title>
        </Modal.Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Modal.Body>
            <TextField name="image" />
            <TextField name="firstName" />
            <TextField name="lastName" />
            <LongTextField name="bio" />
            <TextField name="room" />
            <TextField name="phoneNumber" />
            <LongTextField name="officeHours" />
            <Col className="d-flex justify-content-end">
              <SubmitField value="Submit" />
              <ErrorsField />
            </Col>
            <HiddenField name="owner" />
          </Modal.Body>
        </AutoForm>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

export default EditFacultyProfile;
