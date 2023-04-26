import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import PropTypes, { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';

const FacultyCard = ({ faculty }) => (
  <Row className="py-3">
    <Col className="d-flex gap-4">
      <a href={`/profile/${faculty._id}`} id="faculty-card">
        <Image roundedCircle src={faculty.image} width="100px" />
      </a>
      <div>
        <Link to={`/profile/${faculty._id}`} className="fw-bold faculty-name text-decoration-none text-black">{faculty.firstName} {faculty.lastName}</Link>
        <div>Room {faculty.rooms}</div>
        <div>{faculty.phoneNumber}</div>
      </div>
    </Col>
  </Row>
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
