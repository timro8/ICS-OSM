import React from 'react';
import PropTypes from 'prop-types';
import EditJack from '../Editpages/EditJack';

// Renders the jacks for the room. See pages/Tech.jsx. The EditJack component used for each jack based on jackId
const TechRoomJack = ({ jack }) => (
  <tr>
    <td>{jack.roomNumber}</td>
    <td>{jack.jackNumber}</td>
    <td>{jack.wallLocation}</td>
    <td>{jack.description}</td>
    <td>{jack.IDFRoom}</td>
    <td><EditJack jackId={jack._id} /></td>
  </tr>
);

// Requires a document to be passed to this component.
TechRoomJack.propTypes = {
  jack: PropTypes.shape({
    jackNumber: PropTypes.string,
    wallLocation: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
    roomNumber: PropTypes.arrayOf(PropTypes.string),
    IDFRoom: PropTypes.string,
  }).isRequired,
};

export default TechRoomJack;
