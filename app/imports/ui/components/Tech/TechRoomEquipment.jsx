import React from 'react';
import PropTypes from 'prop-types';
import EditEquipment from '../Editpages/EditEquipment';

// Renders the jacks for the room. See pages/Tech.jsx. The EditJack component used for each jack based on jackId
const TechRoomEquipment = ({ equipment }) => (
  <tr>
    <td>{equipment.roomNumber}</td>
    <td>{equipment.quantity}</td>
    <td>{equipment.description}</td>
    <td>{equipment.serialNumber}</td>
    <td>{equipment.assetTag}</td>
    <td>{equipment.equipmentType}</td>
    <td><EditEquipment equipmentId={equipment._id} /></td>
  </tr>
);

// Requires a document to be passed to this component.
TechRoomEquipment.propTypes = {
  equipment: PropTypes.shape({
    description: PropTypes.string,
    quantity: PropTypes.number,
    serialNumber: PropTypes.string,
    _id: PropTypes.string,
    roomNumber: PropTypes.arrayOf(PropTypes.string),
    assetTag: PropTypes.string,
    equipmentType: PropTypes.string,
  }).isRequired,
};

export default TechRoomEquipment;
