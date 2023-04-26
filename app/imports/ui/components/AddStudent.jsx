import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

// form schema based on the StudentProfile collection.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStudent component for adding a new student. */
const AddStudent = () => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // data submitted to add a new student. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional students.
  const submit = (data, formRef) => {
    const { email, firstName, lastName, password } = data;
    const collectionName = StudentProfiles.getCollectionName();
    const definitionData = { email, firstName, lastName, password };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Student added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ width: '15rem' }} id={`${COMPONENT_IDS.ADD_STUDENT_BUTTON}`}>
        Add Student
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="firstName" id={`${COMPONENT_IDS.ADD_STUDENT_FORM_FIRST_NAME}`} />
            <TextField name="lastName" id={`${COMPONENT_IDS.ADD_STUDENT_FORM_LAST_NAME}`} />
            <TextField name="email" id={`${COMPONENT_IDS.ADD_STUDENT_FORM_EMAIL}`} />
            <TextField name="password" id={`${COMPONENT_IDS.ADD_STUDENT_FORM_PASSWORD}`} />
            <div className="d-flex justify-content-end">
              <SubmitField value="Submit" id={`${COMPONENT_IDS.ADD_STUDENT_FORM_SUBMIT}`} />
            </div>
            <ErrorsField />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};

export default AddStudent;
