import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FacultyCard = ({ faculty }) => (
  <Col style={{ marginBottom: '20px' }}>
    <Card className="w-100" border="info">
      <Card.Body>
        <Row>
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

FacultyCard.propTypes = {
  faculty: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    owner: PropTypes.string,
    room: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyCard;
