import { Col } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClubListItem = ({ club, selectedItemIndex, index }) => (
  <Link to={`/clubs/${club._id}`}>
    <div className={`search-list-item club-list-item ${selectedItemIndex === index ? 'active' : ''}`} key={index}>
      <Col md={1}>
        <img src={club.image} alt="club" />
      </Col>
      <Col md={11}>
        <div className="search-list-item-main">
          {club.clubName}
        </div>
      </Col>
    </div>
  </Link>
);

ClubListItem.propTypes = {
  club: PropTypes.shape({
    clubName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default ClubListItem;
