import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
// import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { EnvelopeFill, KeyFill, Person, PersonFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
// import { UserProfiles } from '../../api/user/UserProfileCollection';
// import { defineMethod } from '../../api/base/BaseCollection.methods';

const SignUpRequest = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /** TODO
   * Submission should send data into admin so that
   * a request card will show up in admin page
   * with all the information.
   */
  const submit = () => {
    swal('Request for a new account has been sent.', 'Success');
    /*
    const collectionName = UserProfiles.getCollectionName();
    const definitionData = doc;
    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        // log the new user in.
        const { email, password } = doc;
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            setError(err.reason);
          } else {
            setError('');
            setRedirectToRef(true);
          }
        });
      })
      .catch((err) => setError(err.reason));
     */
  };

  if (redirectToReferer) {
    return <Navigate to="/add" />;
  }
  return (
    <Container id={PAGE_IDS.SIGN_UP} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Please fill out the form below to request for a new account. <br /> Mahalo!</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={() => submit()}>
            <Card>
              <Card.Body>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <Person style={{ fontSize: '25px', color: 'black' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_REQUEST_FORM_FIRST_NAME} name="firstName" placeholder="First Name" label="" />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <PersonFill style={{ fontSize: '25px', color: 'black' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_REQUEST_FORM_LAST_NAME} name="lastName" placeholder="Last Name" label="" />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <EnvelopeFill style={{ fontSize: '25px', color: 'lightskyblue' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_REQUEST_FORM_EMAIL} name="email" placeholder="Email Address" label="" />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <KeyFill style={{ fontSize: '25px', color: 'gold' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_REQUEST_FORM_PASSWORD} name="password" placeholder="Password" type="password" label="" />
                  </Col>
                </Row>
                <ErrorsField />
                <Col className="d-flex justify-content-center">
                  <SubmitField id={COMPONENT_IDS.SIGN_UP_REQUEST_FORM_SUBMIT} />
                </Col>
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Already have an account? Login <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Request for a new account was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpRequest;
