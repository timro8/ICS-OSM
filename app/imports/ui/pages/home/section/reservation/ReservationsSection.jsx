import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Row, Table } from 'react-bootstrap';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AdminPageReservationComponent from '../../../../components/AdminPage/AdminPageReservationComponent';
import { Rooms } from '../../../../../api/room/RoomCollection';
import { Events302 } from '../../../../../api/events/Events302Collection';
import { FacultyProfiles } from '../../../../../api/user/FacultyProfileCollection';

/* Renders a table containing all of the Faculty documents. Use <Admin> to render each row in each tabs. */
const ReservationsSection = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { events, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription1 = FacultyProfiles.subscribeFacultyProfileAdmin();
    const subscription2 = Rooms.subscribeRoomAdmin();
    const subscription3 = Events302.subscribeEvents302Admin();
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready() && subscription3.ready();
    // Get the Faculty documents
    const items1 = FacultyProfiles.find({}).fetch();
    const items2 = Rooms.find({}).fetch();
    const items3 = Events302.find({}).fetch();
    return {
      faculties: items1,
      rooms: items2,
      events: items3,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Row className="simple-card">
      <div className="d-flex justify-content-between align-items-center" style={{ margin: '15px 0' }}>
        <h2>Reservations</h2>
        <Button href="cal" style={{ width: '15rem', margin: '5px' }}>Reserve room</Button>
      </div>
      <div className="scroll" style={{ height: '15rem' }}>
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => <AdminPageReservationComponent key={event._id} event={event} Events302={event} />)}
          </tbody>
        </Table>
      </div>
    </Row>
  ) : <LoadingSpinner />);
};

export default ReservationsSection;
