import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';

// TODO: Use FacultyRoomCollection to determine who's in which room
// - Map through each facultyroom and make it return an element
// TODO: Associate the room with the positioning of the elements (maybe use the room #)

const roomLocations = [
  { roomNumber: '305F', top: '200px', left: '120px' },
  { roomNumber: '306B', top: '200px', left: '135px' },
  { roomNumber: '306C', top: '200px', left: '150px' },
  { roomNumber: '307A', top: '200px', left: '165px' },
];

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const { ready, rooms } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    return {
      ready: subscription.ready(),
      rooms: Rooms.find().fetch(),
    };
  });

  return ready ? (
    <Row id={PAGE_IDS.HOME} className="py-3 align-content-center text-center">
      <Col>
        <h2>WELCOME</h2>
        {rooms.map(room => (
          <div key={room._id}>
            Room Number: {room.roomNumber}
          </div>
        ))}
        <div style={{ backgroundImage: 'url(\'/images/post-3rd-floor.svg\')', height: '900px', width: '1100px', position: 'relative' }}>
          <div
            className="map-icon"
            style={{
              // TODO: replace the strings
              top: roomLocations.find(element => element.roomNumber === '305F').top,
              left: roomLocations.find(element => element.roomNumber === '305F').left,
              backgroundImage: 'url(\'https://www.ics.hawaii.edu/wp-content/uploads/2019/05/johnson-300x300.jpeg\')',
            }}
          />
          <div
            className="map-icon"
            style={{
              top: '150px',
              left: '120px',
              backgroundImage: 'url(\'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/cam-moore.jpg\')',
            }}
          />
          <div
            className="map-icon"
            style={{
              top: '150px',
              left: '135px',
              backgroundImage: 'url(\'https://www.ics.hawaii.edu/wp-content/uploads/2019/05/johnson-300x300.jpeg\')',
            }}
          />
          <div
            className="map-icon"
            style={{
              top: '150px',
              left: '200px',
            }}
          />
        </div>
      </Col>
    </Row>
  ) : <LoadingSpinner message="Loading Room" />;
};

export default Landing;
