import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/room/RoomCollection';
import RoomItem from '../components/RoomItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Room documents. Use <RoomItem> to render each row. */
const ListRoom = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, rooms } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Room documents.
    const subscription = Rooms.subscribeRoom();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Room documents
    const roomItems = Rooms.find({}, { sort: { roomNumber: 1 } }).fetch();
    return {
      rooms: roomItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_ROOM} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {rooms.map((room) => <RoomItem key={room._id} room={room} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Room" />);
};

export default ListRoom;
