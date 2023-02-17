import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Faculties } from '../../api/faculty/FacultyCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import EditFacultyProfile from './EditFacultyProfile';

// TODO: Get real user data from collections.

const FacultyProfile = () => {
  const { _id } = useParams();
  const { ready, faculty } = useTracker(() => {
    const subscription = Faculties.subscribeFacultyAdmin();
    const rdy = subscription.ready();
    const facultyItem = Faculties.find({ _id: _id }, { sort: { lastName: 1 } }).fetch();
    return {
      ready: rdy,
      faculty: facultyItem,
    };
  }, []);

  /* updates the title based on name of person clicked on */
  useEffect(() => {
    if (ready) {
      document.title = `${faculty[0].firstName} ${faculty[0].lastName}`;
    }
  }, [ready, faculty]);

  return (ready ? (
    <Container id={PAGE_IDS.PROFILE} className="py-3" fluid>
      <Row>
        <Col className="d-flex justify-content-center">
          <Image id="imgProfile" roundedCircle src={faculty[0].image} width="300px" />
        </Col>
      </Row>
      <Card id="cardProfile">
        <Col className="text-center pt-3">
          <h1>{faculty[0].firstName} {faculty[0].lastName}</h1>
          <p>{faculty[0].owner}</p>
          <hr />
          <span className="small">About Me:</span>
          <p className="fw-bold">{faculty[0].bio}</p>
          <hr />
          <span className="small">Room Number:</span>
          <p className="fw-bold">{faculty[0].room}</p>
          <hr />
          <span className="small">Phone Number</span>
          <p className="fw-bold">{faculty[0].phoneNumber}</p>
          <hr />
          <span className="small">Office Hours:</span>
          <p className="fw-bold">{faculty[0].officeHours}</p>
        </Col>
      </Card>
      <EditFacultyProfile />
    </Container>
  ) : <LoadingSpinner message="Loading Faculty Profile" />);
};

export default FacultyProfile;
