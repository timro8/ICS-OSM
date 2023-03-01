import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import * as d3 from 'd3';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import Admin from '../components/Admin';
import FacultyTable from '../components/FacultyTable';
import ReservationsTable from '../components/ReservationsTable';

const roomPositions = [
  { roomNumber: '305F', top: 4, left: 4, vertical: false },
  { roomNumber: '306B', top: 4, left: 13, vertical: false },
  { roomNumber: '306C', top: 4, left: 21, vertical: false },
  { roomNumber: '307A', top: 4, left: 28, vertical: false },
  { roomNumber: '305E', top: 12, left: 3, vertical: false },
  { roomNumber: '306A', top: 12, left: 11.4, vertical: true },
  { roomNumber: '306D', top: 12, left: 22, vertical: false },
  { roomNumber: '307C', top: 14, left: 37, vertical: false },
  { roomNumber: '305D', top: 22, left: 3, vertical: true },
  { roomNumber: '305G', top: 27, left: 11.5, vertical: true },
];

const Home = () => {
  const { rooms } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    return {
      ready: subscription.ready(),
      rooms: Rooms.find().fetch(),
    };
  });

  // The aspect ratio is to make sure that the map container and map size is always the same
  // This preserves (for the most part) the position of the icons if width is changed
  const MAP_ASPECT_RATIO = 1.2704;
  const MAP_WIDTH = 900;
  const MAP_HEIGHT = MAP_WIDTH / MAP_ASPECT_RATIO;

  // Handle the zooming and panning of the map
  useEffect(() => {
    const handleZoom = (e) => {
      const map = document.querySelector('.map');
      map.style.transform = `translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`;
    };

    const zoom = d3.zoom()
      .scaleExtent([1, 2.5])
      .translateExtent([[0, 0], [MAP_WIDTH, MAP_HEIGHT]]) // This prevents the map from being moved off the container
      .on('zoom', handleZoom);

    d3.select('.map-container').call(zoom);
  }, []);

  return (
    <Container id={PAGE_IDS.HOME} className="py-3" style={{ borderLeft: '0.1px solid lightgray', borderRight: '0.1px solid lightgray' }}>
      <Row>
        <Col style={{ padding: '0 2rem' }}>
          <h2>Good Morning James!</h2>
          <Row className="d-flex row-cols-3">
            <Card>
              <Card.Body>
                <Card.Title>Rooms Occupied</Card.Title>
                <ProgressBar now={45} />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Rooms Vacant</Card.Title>
                <ProgressBar variant="info" now={9} />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Rooms Out of Commission</Card.Title>
                <ProgressBar variant="danger" now={2} />
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
      <Row>
        <h2>Pacific Ocean Science and Technology</h2>
        <Col>
          <div className="map-container" style={{ overflow: 'hidden', width: MAP_WIDTH, height: MAP_HEIGHT }}>
            <div
              className="map"
              style={{
                width: MAP_WIDTH,
                height: MAP_HEIGHT,
                background: 'center / contain no-repeat url(\'/images/post-3rd-floor-is(1).svg\')',
                position: 'relative',
                transformOrigin: 'top left',
              }}
            >
              { /* {rooms.map(room => {
                const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                if (roomPosition) {
                  const roomPositionTop = (roomPosition.top / 100) * MAP_HEIGHT;
                  const roomPositionLeft = (roomPosition.left / 100) * MAP_WIDTH;
                  const COLLISION_SPACING = 6;
                  return room.occupants.map((occupant, index) => (
                    <div
                      className="map-icon map-icon-occupant"
                      style={{
                        top: roomPosition.vertical ? `${roomPositionTop + (COLLISION_SPACING * (index + 1))}px` : `${roomPositionTop}px`,
                        left: roomPosition.vertical ? `${roomPositionLeft}px` : `${roomPositionLeft + (COLLISION_SPACING * (index + 1))}px`,
                        background: 'center / contain url(https://www.ics.hawaii.edu/wp-content/uploads/2013/08/cam-moore.jpg)',
                      }}
                    />
                  ));
                }
                return null;
              })} */ }{
                rooms.map(room => {
                  const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                  if (roomPosition) {
                    const roomPositionTop = (roomPosition.top / 100) * MAP_HEIGHT;
                    const roomPositionLeft = (roomPosition.left / 100) * MAP_WIDTH;
                    return (
                      <div
                        className="map-icon map-icon-room"
                        style={{
                          top: `${roomPositionTop}px`,
                          left: `${roomPositionLeft}px`,
                        }}
                      >
                        {room.roomNumber}
                      </div>
                    );
                  }
                  return null;
                })
              }
            </div>
          </div>
        </Col>
        <Col>
          <h2>List View</h2>
          <h3 style={{ fontSize: '1.1rem', paddingBottom: '1rem' }}>Occupied Rooms</h3>
          <h3 style={{ fontSize: '1.1rem', paddingTop: '3rem', paddingBottom: '1rem' }}>Vacant Rooms</h3>
          <h3 style={{ fontSize: '1.1rem', paddingTop: '3rem', paddingBottom: '1rem' }}>Rooms Out of Commission</h3>
        </Col>
      </Row>
      <Row>
        <h2>Faculty Information</h2>
        <FacultyTable />
      </Row>
      <Row>
        <h2>Reservations</h2>
        <ReservationsTable />
      </Row>
    </Container>
  );
};

export default Home;
