import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, ProgressBar, Row } from 'react-bootstrap';
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

  return ready ? (
    <Row id={PAGE_IDS.HOME} className="py-3">
      <h1>Hi (user), Good Morning</h1>
      {/* TODO: Map through each occupant in each of the room and return a map icon.
       if room is empty, display an empty icon regardless.
        Depending on the index change the left of the room position */}

      <div style={{ height: '100vh', width: '80vw', background: 'no-repeat url(\'/images/post-3rd-floor-is(1).svg\')', position: 'relative' }}>
        {rooms.map(room => {
          const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
          if (roomPosition) {
            return room.occupants.map(occupant => {
              console.log(`occupant = ${occupant}`);
              // TODO: Occupant returns the email of the occupant. Use that email to get the actual occupant
              return (
                <div
                  className="map-icon"
                  style={{
                    top: roomPosition.top,
                    left: roomPosition.left,
                    backgroundImage: `url(${occupant.image})`,
                  }}
                />
              );
            });
          }
          return null;
        })}
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
  ) : <LoadingSpinner message="Loading Room" />;
};

export default Home;
