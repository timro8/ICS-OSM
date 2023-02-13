import React from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Calendar from '../components/calendar/Calendar';
import { Events302 } from '../../api/events/Events302Collection';

const ReserveRoom = () => {
  document.title = 'Reservations';
  const { ready, events302 } = useTracker(() => {
    const subscription = Events302.subscribeEvents302();
    const rdy = subscription.ready();
    const allEvents = Events302.find({}, {}).fetch();
    console.log('allEvents', allEvents);
    return {
      events302: allEvents,
      ready: rdy,
    };
  });

  return (
    <Container className="py-3">
      <Calendar events={ready ? events302 : []} />
    </Container>
  );
};

export default ReserveRoom;
