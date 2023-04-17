import { Col } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

const StudentListItem = ({ student, selectedItemIndex, index }) => (
  <div className={`search-list-item faculty-list-item ${selectedItemIndex === index ? 'active' : ''}`} key={index}>
    <Col md={1}>
      <img src={student.image} alt="student" />
    </Col>
    <Col md={11}>
      <div className="search-list-item-main">
        {student.firstName} {student.lastName}
      </div>
      <div className="search-list-item-extra">
        {student.email}
      </div>
    </Col>
  </div>
);

StudentListItem.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default StudentListItem;
