import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
// TODO: Add a dash for naming convention i.e. landing-page
const Landing = () => {
  if (Meteor.userId()) {
    return <Navigate to="/home" />;
  }
  return (
    <Row id={PAGE_IDS.LANDING} className="py-3 landingpage align-content-center text-center">
      {/* TODO: Remove empty col */}
      <Col>
        <h1></h1>
      </Col>
      <Col>
        <h2 className="landingtitle">WELCOME TO ICS-OSM!</h2>
        {/* TODO: Combine paragraphs into single div/p/span/etc. */}
        <p className="landingtext">This is an app that allows you to see the 3rd Floor of POST </p>
        <p className="landingtext">as well as some rooms in the Keller building</p>
        <Col direction="horizontal" className="marginland">
          <Button variant="success" size="lg" href="/signuprequest" className="landingbut ">Sign Up</Button>
          <Button variant="secondary" size="lg" href="/signin">Sign In</Button>
        </Col>
      </Col>
    </Row>
  );
}

export default Landing;
