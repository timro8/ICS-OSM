import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Faculties } from '../../api/faculty/FacultyCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from './LoadingSpinner';

const MakeFacultyCard = ({ faculty }) => (
  <Col style={{ marginBottom: '20px' }}>
    <Card className="w-100" border="info">
      <Card.Body>
        <Row>
          {/* eslint-disable-next-line react/prop-types */}
          <a style={{ color: 'black', textDecoration: 'none' }} href={`/profile/${faculty._id}`}>
            <Col className="d-flex justify-content-center">
              <Image roundedCircle src={faculty.image} width="100px" />
            </Col>
            <hr />
            <Col className="d-flex justify-content-center"><Card.Text>{faculty.firstName} {faculty.lastName}</Card.Text></Col>
            <Col className="d-flex justify-content-center"><Card.Text>{faculty.room}</Card.Text></Col>
          </a>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

const FacultyCard = () => {
  const { ready, faculties } = useTracker(() => {
    const subscription = Faculties.subscribeFacultyAdmin();
    const rdy = subscription.ready();
    const facultyItems = Faculties.find({}, { sort: { lastName: 1 } }).fetch();
    return {
      faculties: facultyItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.PROFILE} className="py-3">
      <Row xs="1" md="2" xl="4">
        {faculties.map((faculty) => <MakeFacultyCard key={faculty._id} faculty={faculty} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Profile" />);
};

MakeFacultyCard.propTypes = {
  faculty: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    owner: PropTypes.string,
    room: PropTypes.string,
  }).isRequired,
};

export default FacultyCard;
