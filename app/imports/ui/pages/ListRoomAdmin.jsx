import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import RoomItemAdmin from '../components/RoomItemAdmin';
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
    // Get the Stuff documents
    const items = Rooms.find({}).fetch();
    return {
      rooms: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_ROOM_ADMIN} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>List Room (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Location</th>
                <th>Status</th>
                <th>Room Notes</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => <RoomItemAdmin key={room._id} room={room} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListRoomAdmin;
