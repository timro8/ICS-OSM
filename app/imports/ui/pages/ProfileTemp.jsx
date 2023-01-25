import React from 'react';
import { Col, Row, Card, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';

const ProfileTemp = () => (
  <Container id={PAGE_IDS.PROFILE} className="py-3" fluid>
    <Row>
      <Col className="d-flex justify-content-center">
        <Image id="imgProfile" roundedCircle src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" width="300px" />
      </Col>
    </Row>
    <Card id="cardProfile">
      <Col className="text-center pt-3">
        <h1>John Doe</h1>
        <p>john@foo.com</p>
        <hr />
        <span className="small">Role:</span>
        <p className="fw-bold">{ROLE.USER}</p>
        <hr />
        <span className="small">About Me:</span>
        <p>I like ICS 414</p>
        <hr />
        <span className="small">More Information:</span>
        <p>There can never be too many cherries on an ice cream sundae.
          Nobody has encountered an explosive daisy and lived to tell the tale.
        </p>
      </Col>
    </Card>
    <Row>
      <Col className="d-flex justify-content-center py-3">
        <Link to="/edit-profile" className="btn btn-primary" id="edit-profile-btn">Edit Profile</Link>
      </Col>
    </Row>
  </Container>
);

export default ProfileTemp;
