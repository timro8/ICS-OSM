import React, { useState } from 'react';
import { _ } from 'meteor/underscore';
import { Container, Table, Tab, Tabs } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/room/RoomCollection';
import { RoomEquipments } from '../../api/room/RoomEquipments';
import { RoomJacks } from '../../api/room/RoomJacks';
import { PAGE_IDS } from '../utilities/PageIDs';
import RoomEquipment from '../components/RoomEquipment';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import TechRoomJack from '../components/TechRoomJack';
import TechAddJack from '../components/TechAddJack';

function getEquipmentData(equipment) {
  // get the room number, location from Rooms Collection and extend the equipment data

  const room = Rooms.find({ _id: equipment.roomId }).fetch();
  return _.extend({}, equipment, room);
}

function getJackData(jack) {
  // get the room number, location from Rooms Collection and extend the jacks data
  const rooms = _.pluck(Rooms.find({ _id: jack.roomId }).fetch(), 'roomNumber');
  return _.extend({}, jack, { roomNumber: rooms });
}

const Tech = () => {

  let [jackData, setList] = useState([]);

  const { equipment, jacks, ready } = useTracker(() => {
    // Get room subscription
    const subRoom = Rooms.subscribeRoom();

    // Get equipment subscription
    const subEquipment = RoomEquipments.subscribeRoomEquipment();

    // Get jack subscription
    const subJack = RoomJacks.subscribeRoomJacks();

    // Determine if the subscriptions are ready
    const rdy = subRoom.ready() && subEquipment.ready() && subJack.ready();

    const documentEquipment = RoomEquipments.find({}).fetch();
    const documentJack = RoomJacks.find({}, { sort: { jackNumber: 1 } }).fetch();
    setList(documentJack);

    // return when subscriptions are completed
    return {
      equipment: documentEquipment,
      jacks: documentJack,
      ready: rdy,
    };
  }, []);
  document.title = 'Tech';
  const equipmentData = equipment.map(e => getEquipmentData(e));
  jackData = jacks.map(j => getJackData(j));
  console.log(jackData);
  const handleJackSearch = (jack) => {
    const searchInput = jack.trim();
    setList(jackData.filter(j => (`${j.location}`).toLowerCase().includes(searchInput.toLowerCase())));
  };

  return (ready ? (
    <Container className="py-3">
      <Container id={PAGE_IDS.TECH}>
        <Tabs
          defaultActiveKey="jacks"
        >
          <Tab eventKey="jacks" title="Jacks">
            <h1>Data Jacks</h1>
            <TechAddJack />
            {/* Search Bar */}
            <SearchBar handleSearch={handleJackSearch} />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Room Number</th>
                  <th>Jack Number</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>IDF Room</th>
                  <th>Edit Jack</th>
                </tr>
              </thead>
              <tbody>
                {jackData.map((j, index) => (
                  <TechRoomJack key={index} jack={j} />
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="equipment" title="Equipment">
            <h1>Equipment</h1>
            <Table responsive bordered hover size="sm">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Serial Number</th>
                  <th>Asset Tag</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {equipmentData.map((e, index) => (
                  <RoomEquipment key={index} equipment={e} />
                ))}
              </tbody>
            </Table>
          </Tab>

        </Tabs>
      </Container>
    </Container>
  ) : <LoadingSpinner message="Loading tech data" />);
};

export default Tech;
