import { Col } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RoomListItem = ({ room, selectedItemIndex, index }) => (
  <Link to={`/roomdetails/${room._id}`} className="search-link">
    <div className={`search-list-item room-list-item ${selectedItemIndex === index ? 'active' : ''}`} key={index}>
      <Col>
        <div className="search-list-item-main">
          {room.location} {room.roomNumber}
        </div>
      </Col>
    </div>
  </Link>
);

RoomListItem.propTypes = {
  room: PropTypes.shape({
    location: PropTypes.string.isRequired,
    roomNumber: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number,
  index: PropTypes.number.isRequired,
};

RoomListItem.defaultProps = {
  selectedItemIndex: -1,
};

export default RoomListItem;
