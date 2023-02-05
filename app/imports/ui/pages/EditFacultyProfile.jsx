import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Faculties } from '../../api/faculty/FacultyCollection';

const bridge = new SimpleSchema2Bridge(Faculties._schema);

/* Renders the EditFaculty page for editing a single document. */
const EditFacultyProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
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
    <Container id={PAGE_IDS.EDIT_FACULTY_PROFILE} className="py-3" fluid>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Faculty Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="image" />
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="bio" />
                <TextField name="room" />
                <TextField name="phoneNumber" />
                <TextField name="officeHours" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditFacultyProfile;
