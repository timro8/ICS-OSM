import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import * as d3 from 'd3';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const roomPositions = [
  { roomNumber: '305F', top: 9, left: 4, vertical: false },
  { roomNumber: '306B', top: 9, left: 13, vertical: false },
  { roomNumber: '306C', top: 9, left: 21, vertical: false },
  { roomNumber: '307A', top: 9, left: 28, vertical: false },
  { roomNumber: '305E', top: 17, left: 3, vertical: false },
  { roomNumber: '306A', top: 17, left: 11.4, vertical: true },
  { roomNumber: '306D', top: 17, left: 22, vertical: false },
  { roomNumber: '307C', top: 18.5, left: 36.7, vertical: false },
  { roomNumber: '305D', top: 26, left: 3, vertical: true },
  { roomNumber: '305G', top: 30, left: 11.5, vertical: true },
];

const Home = () => {
  const { ready, rooms } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    return {
      ready: subscription.ready(),
      rooms: Rooms.find().fetch(),
    };
  });

  const mapHeight = 850;
  const mapWidth = 950;

  // Handle the zooming and panning of the map
  useEffect(() => {
    const handleZoom = (e) => {
      const map = document.querySelector('.map');
      map.style.transform = `translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`;
    };

    const zoom = d3.zoom()
      .scaleExtent([1, 2])
      .translateExtent([[0, 0], [mapWidth, mapHeight]]) // This prevents the map from being moved off the container
      .on('zoom', handleZoom);

    d3.select('.map-container').call(zoom);
  }, []);

  return (
    <Container id={PAGE_IDS.HOME} className="py-3">
      <h2>Pacific Ocean Science and Technology</h2>
      <Row>
        <Col>
          <div className="map-container" style={{ overflow: 'hidden', width: mapWidth, height: mapHeight }}>
            <div
              className="map"
              style={{
                width: mapWidth,
                height: mapHeight,
                background: 'center / contain no-repeat url(\'/images/post-3rd-floor-is(1).svg\')',
                position: 'relative',
                transformOrigin: 'top left',
              }}
            >
              {rooms.map(room => {
                const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                if (roomPosition) {
                  const roomPositionTop = (roomPosition.top / 100) * mapHeight;
                  const roomPositionLeft = (roomPosition.left / 100) * mapWidth;
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
              })}{
                rooms.map(room => {
                  const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                  if (roomPosition) {
                    const roomPositionTop = (roomPosition.top / 100) * mapHeight;
                    const roomPositionLeft = (roomPosition.left / 100) * mapWidth;
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
          <Row>
            <Card style={{ width: '20rem' }}>
              <Card.Body>
                <Card.Title>Rooms Occupied</Card.Title>
                <Card.Text style={{ fontSize: '3rem' }}>45</Card.Text>
                <ProgressBar now={45} />
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card style={{ width: '20rem' }}>
              <Card.Body>
                <Card.Title>Rooms Vacant</Card.Title>
                <Card.Text style={{ fontSize: '3rem' }}>9</Card.Text>
                <ProgressBar variant="info" now={9} />
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card style={{ width: '20rem' }}>
              <Card.Body>
                <Card.Title>Rooms Out of Commission</Card.Title>
                <Card.Text style={{ fontSize: '3rem' }}>2</Card.Text>
                <ProgressBar variant="danger" now={2} />
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
