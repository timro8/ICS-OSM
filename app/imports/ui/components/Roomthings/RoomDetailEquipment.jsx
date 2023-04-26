import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { RoomEquipments } from '../../../api/room/RoomEquipments';
import EditEquipment from '../Editpages/EditEquipment';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';

// Renders the equipment for the room. See pages/RoomDetails.jsx. The EditEquipment component used for each equipment based on the equipment id
const RoomDetailEquipment = ({ equipment }) => {
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
      <td>{equipment.quantity}</td>
      <td>{equipment.description}</td>
      <td>{equipment.serialNumber}</td>
      <td>{equipment.assetTag}</td>
      <td>{equipment.equipmentType}</td>
      <td><EditEquipment equipmentId={equipment._id} /></td>
      <td><Button variant="outline-danger" size="sm" onClick={deleteEquipment}>Delete {equipment.description}</Button></td>
    </tr>
  );
};

// Requires a document to be passed to this component.
RoomDetailEquipment.propTypes = {
  equipment: PropTypes.shape({
    roomId: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    serialNumber: PropTypes.string,
    assetTag: PropTypes.string,
    equipmentType: PropTypes.string,
    roomNumber: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomDetailEquipment;
