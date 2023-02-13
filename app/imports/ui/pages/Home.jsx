import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Card, ProgressBar, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const roomLocations = [
  { roomNumber: '305F', top: '200px', left: '120px' },
  { roomNumber: '306B', top: '200px', left: '135px' },
  { roomNumber: '306C', top: '200px', left: '150px' },
  { roomNumber: '307A', top: '200px', left: '165px' },
];

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
        <h1>Hi (user), Good Morning</h1>
        {/* Map through each facultyroom and make it return an element */}
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
        </div>
      </Col>
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
      <Row>
        <h2>Keller Hall</h2>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Rooms Occupied</Card.Title>
            <Card.Text style={{ fontSize: '3rem' }}>42</Card.Text>
            <ProgressBar now={42} />
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Rooms Vacant</Card.Title>
            <Card.Text style={{ fontSize: '3rem' }}>3</Card.Text>
            <ProgressBar now={3} />
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>Rooms Out of Commission</Card.Title>
            <Card.Text style={{ fontSize: '3rem' }}>0</Card.Text>
            <ProgressBar variant="danger" now={0} />
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card style={{ width: '30rem' }}>
          <Card.Header>Equipments</Card.Header>
          <Card.Body>
            <Card.Text>Total Computers: 150</Card.Text>
            <Card.Text>Total Network Jacks: 300</Card.Text>
            <Card.Text>Total Phone Jacks: 300</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Row>
  ) : <LoadingSpinner message="Loading Room" />;
};

export default Landing;
