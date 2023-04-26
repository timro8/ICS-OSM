import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Col, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { updateMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';
import { ROLE } from '../../../api/role/Role';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';

/* Renders the EditStudent page for editing a single document. */
const EditStudent = ({ id }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Student documents.
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
  // Create a schema to specify the structure of the data to appear in the form.
  const formSchema = new SimpleSchema({
    firstName: String,
    lastName: String,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  // On successful submit, insert the data.
  const submit = async (data) => {
    const { firstName, lastName } = data;
    const collectionName = StudentProfiles.getCollectionName();
    const updateData = { id: id, firstName, lastName };

    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Student updated successfully', 'success'));
  };

  return ready ? (
    <>
      <Col className="d-flex justify-content-center">
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
          <Button id={COMPONENT_IDS.EDIT_STUDENT} key={Math.random()} variant="primary" onClick={handleShow}>
            Edit
          </Button>
        ) : ''}
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title className="d-flex justify-content-center">Edit Student</Modal.Title>
        </Modal.Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Modal.Body>
            <TextField name="firstName" />
            <TextField name="lastName" />
            <Col className="d-flex justify-content-end">
              <SubmitField value="Submit" />
              <ErrorsField />
            </Col>
          </Modal.Body>
        </AutoForm>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

EditStudent.propTypes = {
  id: PropTypes.string.isRequired,
};
export default EditStudent;
