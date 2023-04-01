import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import PropTypes from 'prop-types';

const ListView = ({ rooms }) => {
  const getOccupiedRooms = () => rooms.filter(room => room.status === 'Occupied');
  const getVacantRooms = () => rooms.filter(room => room.status === 'Vacant');
  const getOutOfCommissionRooms = () => rooms.filter(room => room.status === 'Out of Commission');

  const OccupiedRooms = () => (getOccupiedRooms().map(room => <ul><li>{room.roomNumber}</li></ul>));
  const VacantRooms = () => (getVacantRooms().map(room => <ul><li>{room.roomNumber}</li></ul>));
  const OutOfCommissionRooms = () => (getOutOfCommissionRooms().map(room => <ul><li>{room.roomNumber}</li></ul>));

  return (
    <>
      <h2 style={{ margin: '15px 0' }}>List View</h2>
      <Accordion flush>
        <AccordionItem eventKey="0">
          <AccordionHeader>Rooms</AccordionHeader>
          <AccordionBody>
            <Accordion flush>
              <AccordionItem eventKey="0">
                <AccordionHeader>Vacant</AccordionHeader>
                <AccordionBody>
                  <VacantRooms />
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1">
                <AccordionHeader>Occupied</AccordionHeader>
                <AccordionBody>
                  <OccupiedRooms />
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="2">
                <AccordionHeader>Out of Commission</AccordionHeader>
                <AccordionBody>
                  <OutOfCommissionRooms />
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="1">
          <AccordionHeader>Faculties</AccordionHeader>
          <AccordionBody>
            <Accordion flush>
              <AccordionItem eventKey="0">
                <AccordionHeader>Assigned</AccordionHeader>
                <AccordionBody>Body</AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1">
                <AccordionHeader>Unassigned</AccordionHeader>
                <AccordionBody>Body</AccordionBody>
              </AccordionItem>
            </Accordion>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  );
};

ListView.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      roomNumber: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ListView;
