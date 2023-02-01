import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';

const Calendar = () => (
  <div className="w-100">
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      allDaySlot={false}
      slotMinTime="07:00:00"
      slotMaxTime="18:00:00"
      height="auto"
    />
  </div>
);

export default Calendar;
