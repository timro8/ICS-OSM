import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import swal from 'sweetalert';
import { OccupantRoom } from '../../../api/user/OccupantRoomCollection';
import { Rooms } from '../../../api/room/RoomCollection';
import { removeItMethod, updateMethod } from '../../../api/base/BaseCollection.methods';

// Renders the occupant(s) for the room. See pages/RoomDetails.jsx.
const RoomOccupant = ({ occupant, roomId }) => {
  // delete the equipment
  const deleteOccupant = () => {
    let collectionName = OccupantRoom.getCollectionName();
    const occupantRoomId = OccupantRoom.find({ userId: occupant._id, roomId: roomId }).fetch();
    removeItMethod.callPromise({ collectionName, instance: occupantRoomId[0]._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Occupant removed successfully', 'success');
        const occupants = OccupantRoom.find({ roomId: roomId }).fetch();
        collectionName = Rooms.getCollectionName();
        const roomData = Rooms.find({ _id: roomId }).fetch();
        if (occupants.length === 0) {
          const status = 'Vacant';
          const capacity = roomData[0].capacity;
          const roomSqFoot = roomData[0].roomSqFoot;
          const roomClassification = roomData[0].roomClassification;
          const picture = roomData[0].picture;
          const updateData = { id: roomId, status, capacity, roomSqFoot, roomClassification, picture };
          updateMethod.callPromise({ collectionName, updateData });
        } else {
          const status = roomData[0].status;
          const capacity = occupants.length;
          const roomSqFoot = roomData[0].roomSqFoot;
          const roomClassification = roomData[0].roomClassification;
          const picture = roomData[0].picture;
          const updateData = { id: roomId, status, capacity, roomSqFoot, roomClassification, picture };
          updateMethod.callPromise({ collectionName, updateData });
        }
      });

  };

  return (
    <tr>
      <td><Image roundedCircle src={occupant.image} height="35rem" className="px-2" /></td>
      <td>{occupant.firstName}</td>
      <td>{occupant.lastName}</td>
      <td>{occupant.email}</td>
      <td><Button variant="outline-danger" size="sm" onClick={deleteOccupant} id="delete-occupant">Remove {occupant.firstName}</Button></td>
    </tr>
  );
};

// Requires a document to be passed to this component.
RoomOccupant.propTypes = {
  occupant: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  roomId: PropTypes.string.isRequired,
};

export default RoomOccupant;
