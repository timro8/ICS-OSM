import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { OccupantRoom } from '../../../api/user/OccupantRoomCollection';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';

// Renders the occupant(s) for the room. See pages/RoomDetails.jsx.
const RoomOccupant = ({ occupant }) => {
  // delete the equipment
  const deleteEquipment = () => {
    const collectionName = OccupantRoom.getCollectionName();
    removeItMethod.callPromise({ collectionName, instance: occupant._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Occupant removed successfully', 'success');
      });
  };

  return (
    <tr>
      <td>{occupant.picture}</td>
      <td>{occupant.firstName}</td>
      <td>{occupant.lastName}</td>
      <td>{occupant.serialNumber}</td>
      <td>{equipment.assetTag}</td>
      <td><EditEquipment equipmentId={equipment._id} /></td>
      <td><Button variant="outline-danger" size="sm" onClick={deleteEquipment}>Delete {equipment.description}</Button></td>
    </tr>
  );
};

// Requires a document to be passed to this component.
RoomOccupant.propTypes = {
  occpant: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    picture:
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomOccupant;
