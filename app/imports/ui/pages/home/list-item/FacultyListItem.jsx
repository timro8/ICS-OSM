import { Col } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FacultyListItem = ({ faculty, selectedItemIndex, index }) => (
  <Link to={`/profile/${faculty._id}`} className="search-link">
    <div className={`search-list-item faculty-list-item ${selectedItemIndex === index ? 'active' : ''}`} key={index}>
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
  </Link>
);

FacultyListItem.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default FacultyListItem;
