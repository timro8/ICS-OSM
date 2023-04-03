import React, { useState } from 'react';
import { _ } from 'meteor/underscore';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../../api/room/RoomCollection';
import { RoomEquipments } from '../../../api/room/RoomEquipments';
import SearchBar from '../SearchBar';
import LoadingSpinner from '../LoadingSpinner';
import TechRoomEquipment from './TechRoomEquipment';
import TechAddEquipment from './TechAddEquipment';

function getEquipmentData(equipment) {
  // get the room number, location from Rooms Collection and extend the equipment data
  const rooms = _.pluck(Rooms.find({ _id: equipment.roomId }).fetch(), 'roomNumber');
  return _.extend({}, equipment, { roomNumber: rooms });
}

const TechEquipment = () => {

  const { equipment, ready } = useTracker(() => {
    // Get room subscription
    const subRoom = Rooms.subscribeRoom();

    // Get jack subscription
    const subEquipment = RoomEquipments.subscribeRoomEquipment();

    const documentEquipment = RoomEquipments.find({}).fetch();

    // Determine if the subscriptions are ready
    const rdy = subRoom.ready() && subEquipment.ready();

    // return when subscriptions are completed
    return {
      equipment: documentEquipment,
      ready: rdy,
    };
  }, []);
  const equipmentData = equipment.map(e => getEquipmentData(e));

  return (ready ? (
    <Container className="py-3">
      <h1 className="text-center py-2">Equipment</h1>
      <TechAddEquipment />

      {/* Search Bar */}
      <SearchBar />

      <Table responsive bordered hover size="sm">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Serial Number</th>
            <th>Asset Tag</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {equipmentData.map((e, index) => (
            <TechRoomEquipment key={index} equipment={e} />
          ))}
        </tbody>
      </Table>

    </Container>
  ) : <LoadingSpinner message="Loading tech data" />);
};

export default TechEquipment;
