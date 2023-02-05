import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomResModal from './RoomResModal';

const Calendar = ({ events }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // events.map((event) => (
  //   {
  //     title: event.owner,
  //     start: new Date(`${event.start}`),
  //     end: new Date(`${event.end}`),
  //   }
  // ))
  console.log('events in calendar', events);
  return (
    <div className="w-100">
      <h2>Conference Room 302</h2>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
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
        events={[
          {
            id: 'a',
            title: 'test',
            start: '2023-02-04',
          },
          {
            title: 'test2',
            start: '2023-02-04T10:00',
            end: '2023-02-04T16:00',
          },
        ]}
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
