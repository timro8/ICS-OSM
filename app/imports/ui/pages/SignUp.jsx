import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row, FormSelect } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Check, CheckLg, EnvelopeFill, KeyFill, Person, PersonFill, PersonGear, X } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [minReqs, setMinReqs] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputPassword, setInputPassword] = useState(false);

  const roles = ['Role', 'Student', 'Faculty', 'Office', 'Tech'];

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);
  
  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const collectionName = UserProfiles.getCollectionName();
    const definitionData = doc;
    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        // log the new user in.
        const { email } = doc;
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
  };

  const handleFormChange = (key, value) => {
    if (key === 'password') {
      setMinReqs(value.length >= 6);
      setPassword(value);
      setPasswordsMatch(value === confirmPassword);
    }
    if (key === 'confirmPassword') {
      setConfirmPassword(value);
      setPasswordsMatch(value === password);
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to="/" />;
  }
  return (
    <Container id={PAGE_IDS.SIGN_UP} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} onChange={(key, value) => handleFormChange(key, value)}>
            <Card>
              <Card.Body>
                <Col className="text-center">
                  <h2>Sign Up</h2>
                </Col>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <Person style={{ fontSize: '25px', color: 'black' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" placeholder="First Name" label="" />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <PersonFill style={{ fontSize: '25px', color: 'black' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" placeholder="Last Name" label="" />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <EnvelopeFill style={{ fontSize: '25px', color: 'lightskyblue' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="Email address" label="" />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <KeyFill style={{ fontSize: '25px', color: 'gold' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" label="" onBlur={() => setInputPassword(true)} />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-1 mt-1 ms-1">
                    <CheckLg style={{ fontSize: '25px', color: 'green' }} />
                  </Col>
                  <Col>
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_CONFIRM_PASSWORD} name="confirmPassword" placeholder="Confirm Password" type="password" label="" />
                  </Col>
                </Row>
                <Row id="roleSelectDropdown">
                  <Col className="col-1 mt-1 ms-1">
                    <PersonGear style={{ fontSize: '25px', color: 'black' }} />
                  </Col>
                  <Col>
                    <FormSelect id={COMPONENT_IDS.SIGN_UP_FORM_ROLE} name="role" label="">
                      {roles.map((type, key) => <option value={type} key={key}>{type}</option>)}
                    </FormSelect>
                  </Col>
                </Row>
                <Col className="pt-3">
                  <ErrorsField />
                </Col>
                {inputPassword ? (
                  <Row>
                    <Col className="col-1 mt-1 ms-1" />
                    <Col className="small" style={minReqs ? { color: 'white' } : { color: 'red' }}>
                      {minReqs ? <Check /> : <X />} Password must be at least 6 characters long
                    </Col>
                  </Row>
                )
                  : '' }
                {inputPassword ? (
                  <Row className="mb-2">
                    <Col className="col-1 mt-1 ms-1" />
                    <Col className="small" style={passwordsMatch ? { color: 'white' } : { color: 'red' }}>
                      {passwordsMatch ? <Check /> : <X />} Passwords must match
                    </Col>
                  </Row>
                )
                  : '' }
                <Col className="d-flex justify-content-center pt-2">
                  <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
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
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
