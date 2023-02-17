import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import * as d3 from 'd3';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const roomPositions = [
  { roomNumber: '305F', top: 80, left: 30, vertical: false },
  { roomNumber: '306B', top: 80, left: 110, vertical: true },
  { roomNumber: '306C', top: 80, left: 180, vertical: false },
  { roomNumber: '307A', top: 80, left: 260, vertical: false },
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
    <Row id={PAGE_IDS.HOME} className="py-3">
      <h2>Pacific Ocean Science and Technology</h2>
      <Col md="8">
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
                return room.occupants.map(occupant => (
                  <div
                    className="map-icon map-icon-occupant"
                    style={{
                      top: roomPosition.vertical ? `${roomPosition.top + 6}px` : `${roomPosition.top}px`,
                      left: roomPosition.vertical ? `${roomPosition.left}px` : `${roomPosition.left + 6}px`,
                    }}
                  />
                ));
              }
              return null;
            })}{
              rooms.map(room => {
                const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                if (roomPosition) {
                  return (
                    <div
                      className="map-icon map-icon-room"
                      style={{
                        top: `${roomPosition.top}px`,
                        left: `${roomPosition.left}px`,
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
      <Col md="4">
        <h3>Rooms</h3>
      </Col>
      <Row>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Rooms Occupied</Card.Title>
            <Card.Text style={{ fontSize: '3rem' }}>45</Card.Text>
            <ProgressBar now={45} />
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Rooms Vacant</Card.Title>
            <Card.Text style={{ fontSize: '3rem' }}>9</Card.Text>
            <ProgressBar variant="info" now={9} />
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Rooms Out of Commission</Card.Title>
            <Card.Text style={{ fontSize: '3rem' }}>2</Card.Text>
            <ProgressBar variant="danger" now={2} />
          </Card.Body>
        </Card>
      </Row>
    </Row>
  );
};

export default Home;
