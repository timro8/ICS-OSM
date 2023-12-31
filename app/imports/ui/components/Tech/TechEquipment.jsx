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
import DownloadCSVButton from '../DownloadCSVButton';

function getEquipmentData(equipment) {
  // get the room number, location from Rooms Collection and extend the equipment data
  const rooms = _.pluck(Rooms.find({ _id: equipment.roomId }).fetch(), 'roomNumber');
  return _.extend({}, equipment, { roomNumber: rooms });
}

const TechEquipment = () => {
  const [equipmentList, setList] = useState([]);

  const { equipment, ready } = useTracker(() => {
    // Get room subscription
    const subRoom = Rooms.subscribeRoom();

    // Get jack subscription
    const subEquipment = RoomEquipments.subscribeRoomEquipment();

    const documentEquipment = RoomEquipments.find({ equipmentType: 'tech' }).fetch();

    const equipmentData = documentEquipment.map(e => getEquipmentData(e));
    setList(equipmentData);
    // Determine if the subscriptions are ready
    const rdy = subRoom.ready() && subEquipment.ready();

    // return when subscriptions are completed
    return {
      equipment: equipmentData,
      ready: rdy,
    };
  }, []);
  const handleSearch = (search) => {
    const searchInput = search.trim();
    setList(equipment.filter(e => (`${e.roomNumber} + ' ' + ${e.description} + ' ' + ${e.serialNumber} + ' ' + ${e.assetTag} + ' ' + ${e.equipmentType}`).toLowerCase().includes(searchInput.toLowerCase())));
  };
  return (ready ? (
    <Container className="py-3">
      <h2 className="text-center py-2">Equipment</h2>
      <div className="py-3 d-flex gap-2">
        <TechAddEquipment />
        <DownloadCSVButton collection={RoomEquipments} />
      </div>

      {/* Search Bar */}
      <SearchBar handleSearch={handleSearch} />

      <div className="scroll" style={{ height: '20rem' }}>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Serial Number</th>
              <th>Asset Tag</th>
              <th>Actions</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {equipmentList.map((e, index) => (
              <TechRoomEquipment key={index} equipment={e} />
            ))}
          </tbody>
        </Table>
      </div>

    </Container>
  ) : <LoadingSpinner message="Loading tech data" />);
};

export default TechEquipment;
