import { Col } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

const RoomListItem = ({ room, selectedItemIndex, index }) => (
  <div className={`search-list-item room-list-item ${selectedItemIndex === index ? 'active' : ''}`} key={index}>
    <Col>
      <div className="search-list-item-main">
        {room.location} {room.roomNumber}
      </div>
    </Col>
  </div>
);

RoomListItem.propTypes = {
  room: PropTypes.shape({
    location: PropTypes.string.isRequired,
    roomNumber: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default RoomListItem;
