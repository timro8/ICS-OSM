import React from 'react';
import { Col, Row, Card, Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import EditFacultyProfile from './EditFacultyProfile';

const FacultyProfile = () => {
  const { _id } = useParams();
  const { ready, faculty } = useTracker(() => {
    const subscription = FacultyProfiles.subscribeFacultyProfile();
    const rdy = subscription.ready();
    const allFaculty = FacultyProfiles.find({ _id: _id }, { sort: { lastName: 1 } }).fetch();
    return {
      ready: rdy,
      faculty: allFaculty,
    };
  }, []);

  return (ready ? (
    <Container id={PAGE_IDS.PROFILE} className="py-3" fluid>
      <Row>
        <Col className="d-flex justify-content-center py-3">
          <Image id="imgProfile" roundedCircle src={faculty[0].image} width="300px" />
        </Col>
      </Row>
      <Card id="cardProfile">
        <Col className="text-center pt-3">
          <h1>{faculty[0].firstName} {faculty[0].lastName}</h1>
          <p>{faculty[0].email}</p>
          <hr />
          <span className="small">Faculty Role:</span>
          <p className="fw-bold">{faculty[0].facRole}</p>
          <hr />
          <span className="small">About Me:</span>
          <p className="fw-bold p-2">{faculty[0].bio}</p>
          <hr />
          <span className="small">Room Number:</span>
          <p className="fw-bold">{faculty[0].rooms}</p>
          <hr />
          <span className="small">Phone Number</span>
          <p className="fw-bold">{faculty[0].phoneNumber}</p>
          <hr />
          <span className="small">Office Hours:</span>
          <p className="fw-bold">{faculty[0].officeHours}</p>
        </Col>
      </Card>
      <div className="pt-3">
        <EditFacultyProfile id={_id} />
      </div>
    </Container>
  ) : <LoadingSpinner message="Loading Faculty Profile" />);
};

export default FacultyProfile;
