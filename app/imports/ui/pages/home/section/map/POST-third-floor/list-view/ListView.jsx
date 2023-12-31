import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import PropTypes from 'prop-types';
import FacultyListItem from '../../../../list-item/FacultyListItem';
import RoomListItem from '../../../../list-item/RoomListItem';

const RoomsList = ({ rooms, status }) => {
  const roomsByStatus = rooms.filter(room => room.status === status);
  if (!roomsByStatus) {
    return (<div style={{ color: '#444' }}>There are no rooms {status.toLowerCase()}</div>);
  }
  return roomsByStatus.map((room, index) => <RoomListItem index={index} room={room} key={`${room._id}`} />);
};

const FacultiesList = ({ faculties, assigned }) => {
  const facultiesAssigned = faculties.filter(faculty => faculty.rooms[0] !== 'N/A');
  const facultiesUnassigned = faculties.filter(faculty => faculty.rooms[0] === 'N/A');
  if (assigned && !facultiesAssigned) {
    return (<div style={{ color: '#444' }}>There are no assigned faculties</div>);
  }
  if (!assigned && !facultiesUnassigned) {
    return (<div style={{ color: '#444' }}>There are no unassigned faculties</div>);
  }
  if (assigned) {
    return facultiesAssigned.map((faculty, index) => <FacultyListItem faculty={faculty} index={index} key={`${faculty._id}`} />);
  }
  return facultiesUnassigned.map((faculty, index) => <FacultyListItem faculty={faculty} index={index} key={`${faculty._id}`} />);
};

const ListView = ({ rooms, faculties }) => {
  const getRoomAmt = (status) => rooms.filter(room => room.status === status).length;
  const assignedOccupantsAmt = faculties.filter(faculty => faculty.rooms[0] !== 'N/A').length;
  const unassignedOccupantsAmt = faculties.filter(faculty => faculty.rooms[0] === 'N/A').length;
  return (
    <>
      <h2 style={{ margin: '15px 0' }}>List View</h2>
      <Accordion flush>
        <AccordionItem eventKey="0">
          <AccordionHeader>Rooms</AccordionHeader>
          <AccordionBody>
            <Accordion flush>
              <AccordionItem eventKey="0">
                <AccordionHeader>Vacant <span className="num-cell">{getRoomAmt('Vacant')}</span></AccordionHeader>
                <AccordionBody>
                  <RoomsList rooms={rooms} status="Vacant" />
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1">
                <AccordionHeader>Occupied <span className="num-cell">{getRoomAmt('Occupied')}</span></AccordionHeader>
                <AccordionBody>
                  <RoomsList rooms={rooms} status="Occupied" />
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="2">
                <AccordionHeader>Out of Commission <span className="num-cell">{getRoomAmt('Out of Commission')}</span></AccordionHeader>
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
                <AccordionHeader>Assigned <span className="num-cell">{assignedOccupantsAmt}</span></AccordionHeader>
                <AccordionBody><FacultiesList faculties={faculties} assigned /></AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1">
                <AccordionHeader>Unassigned <span className="num-cell">{unassignedOccupantsAmt}</span></AccordionHeader>
                <AccordionBody><FacultiesList faculties={faculties} assigned={false} /></AccordionBody>
              </AccordionItem>
            </Accordion>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  );
};

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

FacultiesList.propTypes = {
  faculties: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      rooms: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  assigned: PropTypes.bool.isRequired,
};

ListView.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      roomNumber: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }),
  ).isRequired,
  faculties: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
      facRole: PropTypes.string,
      rooms: PropTypes.arrayOf(PropTypes.string),
      _id: PropTypes.string,
    }),
  ).isRequired,
};

export default ListView;
