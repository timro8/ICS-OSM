import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';

// form schema based on the RoomJacks collection.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddJac component for adding a new jack. */
const AddStudent = () => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // data submitted to add a new jack. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional jacks.
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
      <Button variant="primary" onClick={handleShow} style={{ width: '15rem' }}>
        Add Student
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="firstName" />
            <TextField name="lastName" />
            <TextField name="email" />
            <TextField name="password" />
            <div className="d-flex justify-content-end">
              <SubmitField value="Submit" />
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
