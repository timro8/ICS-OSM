import React from 'react';
import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container } from 'react-bootstrap';

const CalPage2 = () => (
  <Container className="py-3">
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      allDaySlot={false}
    />
  </Container>
);

export default CalPage2;
