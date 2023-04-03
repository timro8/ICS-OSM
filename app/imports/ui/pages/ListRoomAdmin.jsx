import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OccupantRoom } from '../../api/user/OccupantRoomCollection';
import RoomItem from '../components/RoomItem';
import AddRoom from '../components/AddRoom';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { getRoomData } from '../../api/utilities/getRoomData';
import SearchBar from '../components/SearchBar';

/* Renders a table containing all of the Room documents. Use <RoomItemAdmin> to render each row. */
const ListRoomAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [roomList, setList] = useState([]);
  const { rooms, ready } = useTracker(() => {
    // Get access to Room documents.
    const subscription = Rooms.subscribeRoomAdmin();
    // Get access to Faculty Profile documents.
    const subFaculty = FacultyProfiles.subscribeFacultyProfileAdmin();
    // Get access to Occupant Room documents
    const subOccupant = OccupantRoom.subscribeOccupantRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subFaculty.ready() && subOccupant.ready();
    // Get the Room documents
    const items = Rooms.find({}).fetch();
    const roomKeys = items.map(room => room._id);
    const roomData = roomKeys.map(room => getRoomData(room));
    setList(roomData);
    return {
      rooms: roomData,
      ready: rdy,
    };
  }, []);

  const handleSearch = (search) => {
    const searchInput = search.trim();
    setList(rooms.filter(room => (`${room.roomNumber} + ' ' + ${room.location}`).toLowerCase().includes(searchInput.toLowerCase())));
  };
  document.title = 'Rooms';
  return ready ? (
    <Container id={PAGE_IDS.LIST_ROOM_ADMIN} className="py-3">
      <SearchBar handleSearch={handleSearch} />
      <Row xs={1} md={2} lg={4} className="g-2">
        {roomList.map((room, index) => <RoomItem key={index} room={room} />)}
      </Row>
      <AddRoom />
    </Container>
  ) : <LoadingSpinner />;
};

export default ListRoomAdmin;
