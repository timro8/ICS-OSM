import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OccupantRoom } from '../../api/user/OccupantRoomCollection';
import RoomItem from '../components/RoomItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/** function to get the room data from Rooms, OccupantRoom and FacultyProfile collections */
function getRoomData(roomKey) {
  // Get the data for the room based on the roomKey
  const data = Rooms.findOne({ roomKey: roomKey });

  // Get the data for the roomOccupant based on the roomKey
  const roomOccupant = OccupantRoom.find({ roomKey: roomKey }).fetch();

  // Get the data for the Faculty based on the roomOccupant email
  const occupants = roomOccupant.map(occupant => FacultyProfiles.findByEmail(occupant.email));

  // combine data and occupants objects
  const roomData = Object.assign(data, { occupants: occupants });
  return roomData;
}

/* Renders a table containing all of the Room documents. Use <RoomItemAdmin> to render each row. */
const ListRoomAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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
    return {
      rooms: items,
      ready: rdy,
    };
  }, []);

  const roomKeys = rooms.map(room => room.roomKey);

  const roomData = roomKeys.map(room => getRoomData(room));
  document.title = 'Rooms';
  return ready ? (
    <Container id={PAGE_IDS.LIST_ROOM_ADMIN} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {roomData.map((room) => <RoomItem key={room._id} room={room} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListRoomAdmin;
