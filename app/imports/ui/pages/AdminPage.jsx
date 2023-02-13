import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table, Card, Tab, Tabs } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import AdminPageFacultyComponent from '../components/AdminPage/AdminPageFacultyComponent';
import AdminPageRoomsComponent from '../components/AdminPage/AdminPageRoomsComponent';
import AdminPageReservationComponent from '../components/AdminPage/AdminPageReservationComponent';
import { Rooms } from '../../api/room/RoomCollection';
import { Events302 } from '../../api/events/Events302Collection';
import { Faculties } from '../../api/faculty/FacultyCollection';

/* Renders a table containing all of the Faculty documents. Use <AdminPage> to render each row in each tabs. */
const AdminPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { facultys, rooms, events, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription1 = Faculties.subscribeFacultyAdmin();
    const subscription2 = Rooms.subscribeRoomAdmin();
    const subscription3 = Events302.subscribeEvents302Admin();
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready() && subscription3.ready();
    // Get the Faculty documents
    const items1 = Faculties.find({}).fetch();
    const items2 = Rooms.find({}).fetch();
    const items3 = Events302.find({}).fetch();
    return {
      facultys: items1,
      rooms: items2,
      events: items3,
      ready: rdy,
    };
  }, []);

  document.title = 'Admin';

  return (ready ? (
    <Container
      id={PAGE_IDS.LIST_STUFF_ADMIN}
      className="py-3 text-center justify-content-center"
    >
      <Row>
        <Col md={7}>
          <Card style={{ width: '80rem', height: '37rem' }}>
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
                        {facultys.map((faculty) => <AdminPageFacultyComponent key={faculty._id} faculty={faculty} />)}
                      </tbody>
                    </Table>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Rooms">
                  <Container className="scroll">
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
                  </Container>
                </Tab>
                <Tab eventKey="longer-tab" title="Reservations">
                  <Container className="scroll">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>start</th>
                          <th>end</th>
                          <th>who</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => <AdminPageReservationComponent key={event._id} event={event} Events302={event} />)}
                      </tbody>
                    </Table>
                  </Container>
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
