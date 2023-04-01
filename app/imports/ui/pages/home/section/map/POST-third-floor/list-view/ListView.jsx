import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import PropTypes from 'prop-types';

const RoomsList = ({ rooms, status }) => {
  const roomsByStatus = () => rooms.filter(room => room.status === status);
  if (!roomsByStatus().length) {
    return (<div style={{ color: '#444' }}>There are no rooms {status.toLowerCase()}</div>);
  }
  return roomsByStatus().map(room => <ul><li key={rooms._id}>{room.roomNumber}</li></ul>);
};

const ListView = ({ rooms }) => (
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
                <RoomsList rooms={rooms} status="Vacant" />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="1">
              <AccordionHeader>Occupied</AccordionHeader>
              <AccordionBody>
                <RoomsList rooms={rooms} status="Occupied" />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="2">
              <AccordionHeader>Out of Commission</AccordionHeader>
              <AccordionBody>
                <RoomsList rooms={rooms} status="Out of Commission" />
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

RoomsList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      roomNumber: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }),
  ).isRequired,
  status: PropTypes.string.isRequired,
};

ListView.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      roomNumber: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ListView;
