import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { RoomEquipments } from '../../../api/room/RoomEquipments';
import EditEquipment from '../Editpages/EditEquipment';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';

// Renders the jacks for the room. See pages/Tech.jsx. The EditJack component used for each jack based on jackId
const TechRoomEquipment = ({ equipment }) => {
// delete the equipment
  const deleteEquipment = () => {
    const collectionName = RoomEquipments.getCollectionName();
    removeItMethod.callPromise({ collectionName, instance: equipment._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Equipment removed successfully', 'success');
      });
  };

  return (
    <tr>
      <td>{equipment.roomNumber}</td>
      <td>{equipment.quantity}</td>
      <td>{equipment.description}</td>
      <td>{equipment.serialNumber}</td>
      <td>{equipment.assetTag}</td>
      <td>{equipment.equipmentType}</td>
      <td><EditEquipment equipmentId={equipment._id} /> <Button variant="outline-danger" size="sm" onClick={deleteEquipment}>Delete {equipment.description}</Button></td>
    </tr>
  );
};

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
