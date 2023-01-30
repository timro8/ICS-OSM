import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import RoomItem from '../components/RoomItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Room documents. Use <RoomItemAdmin> to render each row. */
const ListRoomAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { rooms, ready } = useTracker(() => {
    // Get access to Room documents.
    const subscription = Rooms.subscribeRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Room documents
    const items = Rooms.find({}).fetch();
    return {
      rooms: items,
      ready: rdy,
    };
  }, []);
  return ready ? (
    <Container id={PAGE_IDS.LIST_ROOM_ADMIN} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {rooms.map((room) => <RoomItem key={room._id} room={room} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListRoomAdmin;
