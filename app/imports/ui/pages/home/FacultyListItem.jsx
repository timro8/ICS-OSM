import { Col } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

const FacultyListItem = ({ faculty }) => (
  <div className="search-list-item faculty-list-item">
    <Col md={1}>
      <img src={faculty.image} alt="faculty" />
    </Col>
    <Col md={11}>
      <div className="search-list-item-main">
        {faculty.firstName} {faculty.lastName}
      </div>
      <div className="search-list-item-extra">
        {faculty.email}
      </div>
    </Col>
  </div>
);

FacultyListItem.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default FacultyListItem;
