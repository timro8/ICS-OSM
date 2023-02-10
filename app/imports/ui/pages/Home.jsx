import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Row id={PAGE_IDS.HOME} className="py-3 align-content-center text-center">
    <Col>
      <h2>WELCOME</h2>
      <svg xlinkHref="/images/post-3rd-floor.svg" />
      <div style={{ backgroundImage: 'url(\'/images/post-3rd-floor.svg\')', height: '900px', width: '1100px', position: 'relative' }} />
      <div
        className="map-icon"
        style={{
          top: '500px',
          left: '120px',
          backgroundImage: 'url(\'https://www.ics.hawaii.edu/wp-content/uploads/2019/05/johnson-300x300.jpeg\')',
        }}
      />
      <div
        className="map-icon"
        style={{
          top: '450px',
          left: '120px',
          backgroundImage: 'url(\'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/cam-moore.jpg\')',
        }}
      />
      <div
        className="map-icon"
        style={{
          top: '450px',
          left: '135px',
          backgroundImage: 'url(\'https://www.ics.hawaii.edu/wp-content/uploads/2019/05/johnson-300x300.jpeg\')',
        }}
      />
      <div
        className="map-icon"
        style={{
          top: '450px',
          left: '200px',
        }}
      />
    </Col>
  </Row>
);

export default Landing;
