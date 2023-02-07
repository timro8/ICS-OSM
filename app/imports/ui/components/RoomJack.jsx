import React from 'react';
import PropTypes from 'prop-types';
import EditJack from './EditJack';

/** Renders the jacks for the room. See pages/RoomDetails.jsx. */
const RoomJack = ({ jack }) => (
  <tr>
    <td>{jack.jackNumber}</td>
    <td>{jack.description}</td>
    <td><EditJack jackId={jack._id} /></td>
  </tr>
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
