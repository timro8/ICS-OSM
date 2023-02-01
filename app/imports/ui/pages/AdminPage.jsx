import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table, Card, Tab, Tabs } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Stuffs } from '../../api/stuff/StuffCollection';
import AdminPageFacultyComponent from '../components/AdminPageFacultyComponent';
import AdminPageRoomsComponent from '../components/AdminPageRoomsComponent';
import { Rooms } from '../../api/room/RoomCollection';

/* Renders a table containing all of the Faculty documents. Use <AdminPage> to render each row in each tabs. */
const AdminPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { stuffs, rooms, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription1 = Stuffs.subscribeStuffAdmin();
    const subscription2 = Rooms.subscribeRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready();
    // Get the Faculty documents
    const items1 = Stuffs.find({}).fetch();
    const items2 = Rooms.find({}).fetch();
    return {
      stuffs: items1,
      rooms: items2,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_STUFF_ADMIN} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <Col className="text-center"><h2>Admin</h2></Col>
            </Card.Header>
            <Card.Body>
              <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="home" title="Faculty">
                  <div className="scroll">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stuffs.map((stuff) => <AdminPageFacultyComponent key={stuff._id} stuff={stuff} />)}
                      </tbody>
                    </Table>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Rooms">
                  <div className="scroll">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Room Number</th>
                          <th>Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms.map((room) => <AdminPageRoomsComponent key={room._id} room={room} />)}
                      </tbody>
                    </Table>
                  </div>
                </Tab>
                <Tab eventKey="longer-tab" title="Reservations">
                  <h1>h1</h1>
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                  <h1>h1</h1>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminPage;
