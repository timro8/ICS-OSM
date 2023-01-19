import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from 'react-bootstrap';

const localizer = momentLocalizer(moment);
const CalPage = () => (
  <Container style={{ height: '1000px', marginBottom: '100px'}}>
    <div>Calendar Page</div>
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      showMultiDayTimes
      step={60}
    />
  </Container>
);

export default CalPage;
