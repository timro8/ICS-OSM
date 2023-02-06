import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

/** Renders the jacks for the room. See pages/RoomDetails.jsx. */
const RoomJack = ({ jack }) => (
  <ListGroup.Item as="li">
    {jack.jackNumber} - {jack.description}
  </ListGroup.Item>
);

// Require a document to be passed to this component.
RoomJack.propTypes = {
  jack: PropTypes.shape({
    roomId: PropTypes.string,
    jackNumber: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomJack;
