import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useState } from 'react';
import RoomResModal from './RoomResModal';

const Calendar = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="w-100">
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

export default Calendar;
