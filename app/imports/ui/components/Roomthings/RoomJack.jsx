import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { RoomJacks } from '../../../api/room/RoomJacks';
import EditJack from '../Editpages/EditJack';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';

// Renders the jacks for the room. See pages/RoomDetails.jsx. The EditJack component used for each jack based on jackId
const RoomJack = ({ jack }) => {
  const deleteJack = () => {
    const collectionName = RoomJacks.getCollectionName();
    removeItMethod.callPromise({ collectionName, instance: jack._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Jack removed successfully', 'success');
      });
  };
  return (
    <tr>
      <td>{jack.jackNumber}</td>
      <td>{jack.wallLocation}</td>
      <td>{jack.description}</td>
      <td>{jack.IDFRoom}</td>
      <td><EditJack jackId={jack._id} /></td>
      <td><Button variant="outline-danger" size="sm" onClick={deleteJack} id="delete-room-admin-jack">Delete {jack.jackNumber}</Button></td>
    </tr>
  );
};

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
