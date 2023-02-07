import React from 'react';
import PropTypes from 'prop-types';

/** Renders the equipment for the room. See pages/RoomDetails.jsx. */
const RoomEquipment = ({ equipment }) => (
  <tr>
    <td>{equipment.quantity}</td>
    <td>{equipment.description}</td>
    <td>{equipment.serialNumber}</td>
    <td>{equipment.assetTag}</td>
  </tr>
);

// Require a document to be passed to this component.
RoomEquipment.propTypes = {
  equipment: PropTypes.shape({
    roomId: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    serialNumber: PropTypes.string,
    assetTag: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomEquipment;
