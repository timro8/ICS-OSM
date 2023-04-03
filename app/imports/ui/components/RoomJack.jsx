import React from 'react';
import PropTypes from 'prop-types';
import EditJack from './EditJack';

// Renders the jacks for the room. See pages/RoomDetails.jsx. The EditJack component used for each jack based on jackId
const RoomJack = ({ jack }) => (
  <tr>
    <td>{jack.jackNumber}</td>
    <td>{jack.wallLocation}</td>
    <td>{jack.description}</td>
    <td>{jack.IDFRoom}</td>
    <td><EditJack jackId={jack._id} /></td>
  </tr>
);

// Requires a document to be passed to this component.
RoomJack.propTypes = {
  jack: PropTypes.shape({
    roomId: PropTypes.string,
    jackNumber: PropTypes.string,
    wallLocation: PropTypes.string,
    description: PropTypes.string,
    IDFRoom: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomJack;
