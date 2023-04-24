import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Rooms } from '../../../api/room/RoomCollection';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { StaffProfiles } from '../../../api/user/StaffProfileCollection';
import { OccupantRoom } from '../../../api/user/OccupantRoomCollection';
import RoomItem from './RoomItem';
import AddRoom from '../Addpages/AddRoom';
import LoadingSpinner from '../LoadingSpinner';
import { getRoomData } from '../../../api/utilities/getRoomData';
import SearchBar from '../SearchBar';
import DownloadCSVButton from '../DownloadCSVButton';

/* Renders a table containing all of the Room documents. Use <RoomItemAdmin> to render each row. */
const RoomAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [roomList, setList] = useState([]);
  const { rooms, ready } = useTracker(() => {
    // Get access to Room documents.
    const subscription = Rooms.subscribeRoomAdmin();
    // Get access to Faculty Profile documents.
    const subFaculty = FacultyProfiles.subscribeFacultyProfileAdmin();
    // Get access to Staff Profile documents
    const subStaff = StaffProfiles.subscribeStaffProfileAdmin();
    // Get access to Occupant Room documents
    const subOccupant = OccupantRoom.subscribeOccupantRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subFaculty.ready() && subStaff.ready() && subOccupant.ready();
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
    // eslint-disable-next-line max-len
    setList(rooms.filter(room => (`${room.roomNumber} + ' ' + ${room.location} + ' ' + ${room.status} + ' ' + ${room.occupants.map(o => o.firstName)} + ' ' + ${room.occupants.map(o => o.lastName)}  + ' ' + ${room.occupants.map(o => o.email)}`).toLowerCase().includes(searchInput.toLowerCase())));
  };
  document.title = 'Rooms';
  return ready ? (
    <Container className="py-3">
      <h4>POST Rooms</h4>
      <SearchBar handleSearch={handleSearch} />
      <div className="py-3 d-flex gap-2">

        <AddRoom />

        <DownloadCSVButton collection={Rooms} />
      </div>
      <Row xs={1} md={2} lg={4} className="g-2">
        {roomList.map((room) => <RoomItem key={Math.random()} room={room} />)}
      </Row>

    </Container>
  ) : <LoadingSpinner />;
};

export default RoomAdmin;
