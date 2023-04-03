import React, { useState } from 'react';
import { _ } from 'meteor/underscore';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../../api/room/RoomCollection';
import { RoomJacks } from '../../../api/room/RoomJacks';
import SearchBar from '../SearchBar';
import LoadingSpinner from '../LoadingSpinner';
import TechRoomJack from './TechRoomJack';
import TechAddJack from './TechAddJack';

function getJackData(jack) {
  // get the room number, location from Rooms Collection and extend the jacks data
  const rooms = _.pluck(Rooms.find({ _id: jack.roomId }).fetch(), 'roomNumber');
  return _.extend({}, jack, { roomNumber: rooms });
}

const TechJack = () => {

  let [jackData, setList] = useState([]);

  const { jacks, ready } = useTracker(() => {
    // Get room subscription
    const subRoom = Rooms.subscribeRoom();

    // Get jack subscription
    const subJack = RoomJacks.subscribeRoomJacks();

    // Determine if the subscriptions are ready
    const rdy = subRoom.ready() && subJack.ready();

    const documentJack = RoomJacks.find({}, { sort: { jackNumber: 1 } }).fetch();
    setList(documentJack);

    // return when subscriptions are completed
    return {
      jacks: documentJack,
      ready: rdy,
    };
  }, []);
  jackData = jacks.map(j => getJackData(j));
  const handleJackSearch = (jack) => {
    const searchInput = jack.trim();
    setList(jackData.filter(j => (`${j.location}`).toLowerCase().includes(searchInput.toLowerCase())));
  };

  return (ready ? (
    <Container className="py-3">
      <h1 className="text-center p-2">Data Jacks</h1>
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

    </Container>
  ) : <LoadingSpinner message="Loading tech data" />);
};

export default TechJack;
