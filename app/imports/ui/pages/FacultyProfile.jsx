import React from 'react';
import { Col, Row, Card, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Faculties } from '../../api/faculty/FacultyCollection';

// TODO: Get real user data from collections.

const MakeProfile = ({ faculty }) => (
  <Container id={PAGE_IDS.PROFILE} className="py-3" fluid>
    <Row>
      <Col className="d-flex justify-content-center">
        <Image id="imgProfile" roundedCircle src={faculty.image} width="300px" />
      </Col>
    </Row>
    <Card id="cardProfile">
      <Col className="text-center pt-3">
        <h1>{faculty.firstName} {faculty.lastName}</h1>
        <p>{faculty.owner}</p>
        <hr />
        <span className="small">About Me:</span>
        <p className="fw-bold">{faculty.bio}</p>
        <hr />
        <span className="small">Room Number:</span>
        <p className="fw-bold">{faculty.room}</p>
        <hr />
        <span className="small">Phone Number</span>
        <p className="fw-bold">{faculty.phoneNumber}</p>
        <hr />
        <span className="small">Office Hours:</span>
        <p className="fw-bold">{faculty.officeHours}</p>
      </Col>
    </Card>
    <Row>
      <Col className="d-flex justify-content-center py-3">
        <Link to="/edit-profile" className="btn btn-primary" id="edit-profile-btn">Edit Profile</Link>
      </Col>
    </Row>
  </Container>
);

const FacultyProfile = () => {
  const { ready, faculties } = useTracker(() => {
    const subscription = Faculties.subscribeFaculty();
    const rdy = subscription.ready();
    const facultyItems = Faculties.find({}, { sort: { lastName: 1 } }).fetch();
    return {
      faculties: facultyItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.PROFILE} className="py-3">
      <Row>
        {faculties.map((faculty) => <MakeProfile key={faculty._id} faculty={faculty} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Profile" />);
};

MakeProfile.propTypes = {
  faculty: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    owner: PropTypes.string,
    bio: PropTypes.string,
    room: PropTypes.string,
    phoneNumber: PropTypes.string,
    officeHours: PropTypes.string,
  }).isRequired,
};

export default FacultyProfile;
