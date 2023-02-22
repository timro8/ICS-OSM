import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Discussions } from '../../api/discussion/Discussion';
import { defineMethod } from '../../api/base/BaseCollection.methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  image: { type: String, optional: true },
  title: String,
  description: { type: String, optional: true },
  flair: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddDisc = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { image, title, description, flair } = data;
    const owner = Meteor.user().username;
    const collectionName = Discussions.getCollectionName();
    const definitionData = { image, title, description, flair, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <LongTextField name="description" />
                <TextField name="image" />
                <TextField name="flair" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddDisc;
