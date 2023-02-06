import React, { useState } from 'react';
import { Col, Row, Card, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Faculties } from '../../api/faculty/FacultyCollection';
import LoadingSpinner from '../components/LoadingSpinner';

// TODO: Get real user data from collections.

const FacultyProfile = () => {
  const { _id } = useParams();
  const [faculty, setFaculty] = useState([]);
  const { ready } = useTracker(() => {
    const subscription = Faculties.subscribeFacultyAdmin();
    const rdy = subscription.ready();
    setFaculty(Faculties.find({ _id: _id }, { sort: { lastName: 1 } }).fetch());
    return {
      ready: rdy,
    };
  }, []);
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
      <Row>
        <Col className="d-flex justify-content-center py-3">
          <Link to={`/editfacultyprofile/${_id}`} className="btn btn-primary">Edit Profile</Link>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Faculty Profile" />);
};

export default FacultyProfile;
