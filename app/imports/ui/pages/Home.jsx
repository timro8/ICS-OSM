import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Row id={PAGE_IDS.HOME} className="py-3 align-content-center text-center">
    <Col>
      <h2>WELCOME</h2>
      <h3>Instructions</h3>
    </Col>
  </Row>
);

export default Landing;
