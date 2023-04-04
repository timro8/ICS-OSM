import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import PropTypes, { arrayOf } from 'prop-types';

const FacultyCard = ({ faculty }) => (
  <Col style={{ marginBottom: '20px' }}>
    <Card className="w-100" border="info">
      <Card.Body>
        <Row>
          <a style={{ color: 'black', textDecoration: 'none' }} className="faculty-card" href={`/profile/${faculty._id}`}>
            <Col className="d-flex justify-content-center">
              <Image roundedCircle src={faculty.image} width="100px" />
            </Col>
            <hr />
            <Col className="d-flex justify-content-center"><Card.Text>{faculty.firstName} {faculty.lastName}</Card.Text></Col>
            <Col className="d-flex justify-content-center"><Card.Text>Room: {faculty.rooms} </Card.Text></Col>
          </a>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

FacultyCard.propTypes = {
  faculty: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    facRole: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    rooms: arrayOf(PropTypes.string),
    phoneNumber: PropTypes.string,
    officeHours: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyCard;
