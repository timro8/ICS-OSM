import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RoomResModal from './RoomResModal';

const Calendar = ({ events }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="w-100">
      <h2>Conference Room 302</h2>
      <FullCalendar
        plugins={[timeGridPlugin]}
        allDaySlot={false}
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
        events={events.map(event => ({
          title: event.owner,
          start: event.start,
          end: event.end,
        }))}
      />
      <RoomResModal handleClose={handleClose} show={show} events={events} />
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    owner: PropTypes.string,
  })).isRequired,
};
export default Calendar;
