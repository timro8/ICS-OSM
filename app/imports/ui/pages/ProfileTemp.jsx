import React from 'react';
import { Col, Row, Card, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/faculty/FacultyCollection';
import { FacultyRoles } from '../../api/faculty/FacultyRolesCollection';

// TODO: Get real user data from collections.

const MakeProfile = ({ profile, position }) => (
  <Container id={PAGE_IDS.PROFILE} className="py-3" fluid>
    <Row>
      <Col className="d-flex justify-content-center">
        <Image id="imgProfile" roundedCircle src={profile.image} width="300px" />
      </Col>
    </Row>
    <Card id="cardProfile">
      <Col className="text-center pt-3">
        <h1>{profile.firstName} {profile.lastName}</h1>
        <p>{profile.email}</p>
        <hr />
        <span className="small">About Me:</span>
        <p>{profile.bio}</p>
        <hr />
        <span className="small">Role:</span>
        <p className="fw-bold">{position.role}</p>
        <hr />
        <span className="small">Room Number:</span>
        <p className="fw-bold">{profile.room}</p>
        <hr />
        <span className="small">Phone Number</span>
        <p className="fw-bold">{profile.phoneNumber}</p>
        <hr />
        <span className="small">Office Hours:</span>
        <p className="fw-bold">{profile.officeHours}</p>
      </Col>
    </Card>
    <Row>
      <Col className="d-flex justify-content-center py-3">
        <Link to="/edit-profile" className="btn btn-primary" id="edit-profile-btn">Edit Profile</Link>
      </Col>
    </Row>
  </Container>
);

const Profile = () => {
  const { ready, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = FacultyRoles.subscribeFacultyRole();
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    const profileItems = Profiles.find({}, { sort: { lastName: 1 } }).fetch();
    return {
      profiles: profileItems,
      ready: rdy, rdy2,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.PROFILE} className="py-3">
      <Row>
        {profiles.map((profile) => <MakeProfile key={profile._id} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Profile" />);
};

MakeProfile.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    officeHours: PropTypes.string,
    bio: PropTypes.number,
    email: PropTypes.string,
  }).isRequired,
  position: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
};

export default Profile;
