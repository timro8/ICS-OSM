import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { EnvelopeFill, KeyFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/home" />);
  }

  document.title = 'OSMICS - Sign In';
  // Otherwise return the Login form.
  return (
    <Container id={PAGE_IDS.SIGN_IN} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body height="50%">
                <Col className="text-center">
                  <h2>Login to your account</h2>
                </Col>
                <Row className="mt-4">
                  <Col className="col-1 mt-1 ms-1">
                    <EnvelopeFill style={{ fontSize: '25px', color: 'lightskyblue' }} />
                  </Col>
                  <Col className="mx-2">
                    <TextField id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL} name="email" placeholder="Email" label="" />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <KeyFill style={{ fontSize: '25px', color: 'gold' }} />
                  </Col>
                  <Col className="mx-2">
                    <TextField id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD} name="password" placeholder="Password" type="password" label="" />
                  </Col>
                </Row>
                <ErrorsField />
                <Col className="d-flex justify-content-center">
                  <SubmitField id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT} />
                </Col>

              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Not a member?&nbsp;
            <Link to="/signup">Click here to Register</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
