import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
// TODO: Add a dash for naming convention i.e. landing-page
const Landing = () => {
  document.title = 'OSMICS';

  if (Meteor.userId()) {
    return <Navigate to="/home" />;
  }

  return (
    <div
      id={PAGE_IDS.LANDING}
      className="py-3 d-flex align-items-center text-center min-vh-100"
      style={{
        background: 'radial-gradient(circle at 10% 80%, rgb(200, 194, 252) 10%, rgb(140, 222, 211) 89.8%)',
      }}
    >
      <Container className="h-100 d-flex flex-column gap-5 justify-content-center text-white">
        <h1 className="display-1 fw-bold">WELCOME TO OSMICS!</h1>
        <h2 className="display-6 fw-bold">Designed to improve your experience in the ICS department.</h2>
        <div>
          <Button
            id="landing-login-btn"
            variant="outline-light"
            size="lg"
            href="/signin"
          >
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
