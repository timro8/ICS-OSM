import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import RoomResModal from './RoomResModal';
import { Events302 } from '../../../api/events/Events302Collection';

const Calendar = ({ events }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
  console.log(events);
  return (
    <div className="w-100">
      { ready ? console.log('events', events302) : console.log('is ready', ready) }
      <h2>Conference Room 302</h2>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        slotMinTime="07:00:00"
        slotMaxTime="18:00:00"
        height="auto"
        headerToolbar={{
          start: 'title',
          center: '',
          end: 'myCustomButton prev,next',
        }}
        customButtons={{
          myCustomButton: {
            text: 'Reserve Room',
            click: handleShow,
          },
        }}
      />
      <RoomResModal handleClose={handleClose} show={show} />
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    owner: PropTypes.string,
  })).isRequired,
};
export default Calendar;
