import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField } from 'uniforms-bootstrap5';
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

  document.title = 'Sign In';
  // Otherwise return the Login form.
  return (
    <div className="green-purple-gradient">
      <Container id={PAGE_IDS.SIGN_IN} className="py-3 d-flex min-vh-100 align-items-center justify-content-center">
        <AutoForm schema={bridge} onSubmit={data => submit(data)}>
          <Card style={{ boxShadow: '0 2px 6px rgb(0 0 0 / 20%)' }}>
            <Card.Body className="w-100 d-flex align-items-center py-3" style={{ minHeight: '18rem', minWidth: '25rem', maxWidth: '35rem' }}>
              <Row>
                <Col xs={3}>
                  <Image fluid src="/images/uh-seal.png" />
                </Col>
                <Col>
                  <TextField id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL} name="email" placeholder="UH Email" label="" />
                  <TextField id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD} name="password" placeholder="UH Password" type="password" label="" />
                  <ErrorsField />
                  <Button type="submit" variant="secondary" className="w-100" id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT}>Login</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </AutoForm>
        {error === '' ? (
          ''
        ) : (
          <Alert variant="danger">
            <Alert.Heading>Login was not successful</Alert.Heading>
            {error}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default SignIn;
