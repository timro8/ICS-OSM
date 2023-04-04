import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Row, Table } from 'react-bootstrap';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AdminPageReservationComponent from '../../../../components/AdminPage/AdminPageReservationComponent';
import { Events302 } from '../../../../../api/events/Events302Collection';

/* Renders a table containing all of the Faculty documents. Use <Admin> to render each row in each tabs. */
const ReservationsSection = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { events, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription = Events302.subscribeEvents302Admin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Faculty documents
    const items = Events302.find({}).fetch();
    return {
      events: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Row className="simple-card">
      <div className="d-flex justify-content-between align-items-center" style={{ margin: '15px 0' }}>
        <h2>Reservations</h2>
        {/** TO-DO. Maybe a button that delete a reservation? Also, TA's, club officers,
          and faculties can reserve rooms. Can office and tech reserve rooms? */}
        {/** Button that takes the user to reserve room page */}
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
          {/** Reiterates/map objects through Events302Collection.js */}
          <tbody>
            {events.map((event) => <AdminPageReservationComponent key={event._id} event={event} Events302={event} />)}
          </tbody>
        </Table>
      </div>
    </Row>
  ) : <LoadingSpinner />);
};

export default ReservationsSection;
