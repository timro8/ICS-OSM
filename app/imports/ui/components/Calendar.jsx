import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';

const Calendar = () => (
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
          click: function () {
            alert('clicked the custom button!');
          },
        },
      }}
    />
  </div>
);

export default Calendar;
