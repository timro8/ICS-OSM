import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
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
    // Get access to Stuff documents.
    const subscription = Rooms.subscribeRoom();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const roomItems = Rooms.find({}, { sort: { roomNumber: 1 } }).fetch();
    return {
      rooms: roomItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_STUFF} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Room</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Location</th>
                <th>Status</th>
                <th>Room Notes</th>
                <th>Room Picture</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => <RoomItem key={room._id} room={room} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Room" />);
};

export default ListRoom;
