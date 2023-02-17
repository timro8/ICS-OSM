import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, ProgressBar, Row } from 'react-bootstrap';
import * as d3 from 'd3';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const roomPositions = [
  { roomNumber: '305F', top: '200px', left: '120px' },
  { roomNumber: '306B', top: '200px', left: '135px' },
  { roomNumber: '306C', top: '200px', left: '150px' },
  { roomNumber: '307A', top: '200px', left: '165px' },
];

const Home = () => {
  const { ready, rooms } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    return {
      ready: subscription.ready(),
      rooms: Rooms.find().fetch(),
    };
  });

  const height = 850;
  const width = 950;

  useEffect(() => {
    const handleZoom = (e) => {
      const map = document.querySelector('.map');
      map.style.transform = `translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`;
    };

    const zoom = d3.zoom()
      .scaleExtent([1, 2])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', handleZoom);

    d3.select('.map-container').call(zoom);
  }, []);

  return (
    <Row id={PAGE_IDS.HOME} className="py-3">
      <div className="map-container" style={{ overflow: 'hidden', width: width, height: height }}>
        <div
          className="map"
          style={{
            width: width,
            height: height,
            background: 'center / contain no-repeat url(\'/images/post-3rd-floor-is(1).svg\')',
            position: 'relative',
            transformOrigin: 'top left',
          }}
        />
      </div>
      <Row>
        <h2>Total</h2>
        <ProgressBar>
          <ProgressBar variant="success" now={83} key={1} />
          <ProgressBar variant="warning" now={14} key={2} />
          <ProgressBar variant="danger" now={3} key={3} />
        </ProgressBar>
      </Row>
      <Row>
        <h2>Pacific Ocean Science and Technology</h2>
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
