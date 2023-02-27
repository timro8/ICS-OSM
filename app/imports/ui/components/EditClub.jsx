import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Col, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from './LoadingSpinner';
import { Clubs } from '../../api/club/Club';

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

  // On successful submit, insert the data.
  const submit = (data) => {
    const { clubKey, clubName, image, description, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor } = data;
    const collectionName = Clubs.getCollectionName();
    const updateData = { id: id, clubKey, clubName, image, description, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Clubs updated successfully', 'success'));
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
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Modal.Body>
            <TextField name="clubName" />
            <TextField name="image" />
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
            <HiddenField name="clubKey" />
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
