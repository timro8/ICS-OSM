import React, { useState } from 'react';
import { _ } from 'meteor/underscore';
import { Button, Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../../api/room/RoomCollection';
import { RoomJacks } from '../../../api/room/RoomJacks';
import SearchBar from '../SearchBar';
import LoadingSpinner from '../LoadingSpinner';
import TechRoomJack from './TechRoomJack';
import TechAddJack from './TechAddJack';
import { downloadCsv } from '../../../api/utilities/downloadCsv';
import DownloadCSVButton from '../DownloadCSVButton';

function getJackData(jack) {
  // get the room number, location from Rooms Collection and extend the jacks data
  const rooms = _.pluck(Rooms.find({ _id: jack.roomId }).fetch(), 'roomNumber');
  return _.extend({}, jack, { roomNumber: rooms });
}

const TechJack = () => {

  const [jackList, setList] = useState([]);

  const { jacks, ready } = useTracker(() => {
    // Get room subscription
    const subRoom = Rooms.subscribeRoom();

    // Get jack subscription
    const subJack = RoomJacks.subscribeRoomJacks();

    // Determine if the subscriptions are ready
    const rdy = subRoom.ready() && subJack.ready();

    const documentJack = RoomJacks.find({}, { sort: { jackNumber: 1 } }).fetch();
    const jackData = documentJack.map(j => getJackData(j));
    setList(jackData);
    // return when subscriptions are completed
    return {
      jacks: jackData,
      ready: rdy,
    };
  }, []);
  const handleSearch = (search) => {
    const searchInput = search.trim();
    setList(jacks.filter(jack => (`${jack.roomNumber} + ' ' + ${jack.jackNumber} + ' ' + ${jack.wallLocation} + ' ' + ${jack.IDFRoom}`).toLowerCase().includes(searchInput.toLowerCase())));
  };

  return (ready ? (
    <Container className="py-3">
      <h1 className="text-center p-2 display-4">Data Jacks</h1>
      <TechAddJack />
      {/* Search Bar */}
      <SearchBar handleSearch={handleSearch} />
      <Table responsive hover>
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
          {jackList.map((j, index) => (
            <TechRoomJack key={index} jack={j} />
          ))}
        </tbody>
      </Table>
      {/*<Button onClick={() => downloadCsv(RoomJacks)}>dump</Button>*/}
      <DownloadCSVButton collection={RoomJacks} />
    </Container>
  ) : <LoadingSpinner message="Loading tech data" />);
};

export default TechJack;
