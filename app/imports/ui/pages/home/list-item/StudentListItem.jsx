import { Col } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

const StudentListItem = ({ student, selectedItemIndex, index }) => (
  <div className={`search-list-item student-list-item ${selectedItemIndex === index ? 'active' : ''}`} key={index}>
    <Col>
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
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default StudentListItem;
