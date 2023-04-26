import React, { useState } from 'react';
import { _ } from 'meteor/underscore';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../../api/room/RoomCollection';
import { RoomEquipments } from '../../../api/room/RoomEquipments';
import SearchBar from '../SearchBar';
import LoadingSpinner from '../LoadingSpinner';
import RoomEquipment from './RoomEquipment';
import AddEquipment from '../Addpages/AddEquipment';
import DownloadCSVButton from '../DownloadCSVButton';

function getEquipmentData(equipment) {
  // get the room number, location from Rooms Collection and extend the equipment data
  const rooms = _.pluck(Rooms.find({ _id: equipment.roomId }).fetch(), 'roomNumber');
  return _.extend({}, equipment, { roomNumber: rooms });
}

const RoomAdminEquipment = () => {
  const [equipmentList, setList] = useState([]);

  const { equipment, ready } = useTracker(() => {
    // Get room subscription
    const subRoom = Rooms.subscribeRoom();

    // Get jack subscription
    const subEquipment = RoomEquipments.subscribeRoomEquipment();

    const documentEquipment = RoomEquipments.find({}).fetch();

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
      <h1 className="text-center py-2 display-4">Equipment (furniture and tech)</h1>
      <div className="py-3 d-flex gap-2">
        <AddEquipment />
        <DownloadCSVButton collection={RoomEquipments} />
      </div>
      {/* Search Bar */}
      <SearchBar handleSearch={handleSearch} />

      <Table responsive hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Serial Number</th>
            <th>Asset Tag</th>
            <th>Equipment Type</th>
            <th>Actions</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((e, index) => (
            <RoomEquipment key={index} equipment={e} />
          ))}
        </tbody>
      </Table>

    </Container>
  ) : <LoadingSpinner message="Loading tech data" />);
};

export default RoomAdminEquipment;
