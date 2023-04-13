import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Col, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import LoadingSpinner from './LoadingSpinner';

const bridge = new SimpleSchema2Bridge(StudentProfiles._schema);

/* Renders the EditClubs page for editing a single document. */
const DeleteStudent = ({ id }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Clubs documents.
    const subscription = StudentProfiles.subscribeStudentProfile();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = StudentProfiles.findDoc(id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [id]);

  // On successful submit, insert the data.
  const submit = async () => {
    const studentId = doc._id;
    const collectionName = StudentProfiles.getCollectionName();
    removeItMethod.callPromise({ collectionName, studentId })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Student deleted successfully', 'success'));
  };

  return ready ? (
    <>
      <Col className="d-flex justify-content-center">
        <Button variant="danger" onClick={handleShow}>
          Delete
        </Button>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title className="d-flex justify-content-center">Edit Club</Modal.Title>
        </Modal.Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Modal.Body>
            <div>
              <strong className="d-flex justify-content-center p-5">Are you sure you want to delete this student?</strong>
            </div>
            <Col className="d-flex justify-content-end">
              <SubmitField value="Yes" variant="success" className="pe-2" />
              <Button
                variant="danger"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <ErrorsField />
            </Col>
          </Modal.Body>
        </AutoForm>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

DeleteStudent.propTypes = {
  id: PropTypes.string.isRequired,
};
export default DeleteStudent;
