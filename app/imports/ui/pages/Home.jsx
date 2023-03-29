import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap';
import * as d3 from 'd3';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Rooms } from '../../api/room/RoomCollection';
import FacultyTable from '../components/homepage/FacultyTable';
import ReservationsTable from '../components/homepage/ReservationsTable';
import { getRoomData } from '../../api/utilities/getRoomData';
import { ROLE } from '../../api/role/Role';

const roomPositions = [
  { roomNumber: '305F', top: 4, left: 4, vertical: false },
  { roomNumber: '305', top: 17, left: 8, vertical: true },
  { roomNumber: '306B', top: 4, left: 13, vertical: false },
  { roomNumber: '306C', top: 4, left: 21, vertical: false },
  { roomNumber: '307A', top: 4, left: 28, vertical: false },
  { roomNumber: '307', top: 13, left: 29, vertical: false },
  { roomNumber: '307B', top: 5, left: 37, vertical: true },
  { roomNumber: '305E', top: 12, left: 3, vertical: false },
  { roomNumber: '306A', top: 10, left: 11.4, vertical: true },
  { roomNumber: '306', top: 10, left: 16.5, vertical: true },
  { roomNumber: '306D', top: 12, left: 22, vertical: false },
  { roomNumber: '307C', top: 14, left: 37, vertical: false },
  { roomNumber: '305D', top: 22, left: 3, vertical: true },
  { roomNumber: '305C', top: 33, left: 3, vertical: true },
  { roomNumber: '305B', top: 42, left: 4, vertical: false },
  { roomNumber: '305A', top: 42, left: 11, vertical: false },
  { roomNumber: '305G', top: 27, left: 11.5, vertical: true },
  { roomNumber: '309B', top: 4, left: 56.5, vertical: false },
  { roomNumber: '309', top: 12, left: 65, vertical: false },
  { roomNumber: '309C', top: 4, left: 66, vertical: false },
  { roomNumber: '310B', top: 4, left: 74, vertical: false },
  { roomNumber: '310C', top: 4, left: 82, vertical: false },
  { roomNumber: '311A', top: 5, left: 88.5, vertical: true },
  { roomNumber: '311B', top: 5, left: 94.5, vertical: true },
  { roomNumber: '309A', top: 12, left: 55.5, vertical: false },
  { roomNumber: '310A', top: 11, left: 72.5, vertical: true },
  { roomNumber: '310', top: 11, left: 77, vertical: true },
  { roomNumber: '311', top: 16, left: 92, vertical: true },
  { roomNumber: '311C', top: 16, left: 90, vertical: true },
  { roomNumber: '312', top: 23, left: 92, vertical: true },
  { roomNumber: '312A', top: 28, left: 94.5, vertical: true },
  { roomNumber: '312B', top: 40, left: 93, vertical: false },
  { roomNumber: '312C', top: 39, left: 86, vertical: true },
  { roomNumber: '328', top: 35, left: 30, vertical: true },
  { roomNumber: '327', top: 35, left: 40, vertical: true },
  { roomNumber: '326', top: 30, left: 52, vertical: false },
  { roomNumber: '326A', top: 34, left: 52, vertical: false },
  { roomNumber: '325', top: 34, left: 62, vertical: false },
  { roomNumber: '318A', top: 65, left: 30, vertical: false },
  { roomNumber: '318C', top: 55, left: 37, vertical: false },
  { roomNumber: '318', top: 67, left: 46, vertical: true },
  { roomNumber: '318B', top: 61, left: 57, vertical: false },
  { roomNumber: '318D', top: 50, left: 57, vertical: false },
  { roomNumber: '318E', top: 50, left: 57, vertical: false },
  { roomNumber: '319', top: 61, left: 71, vertical: false },
  { roomNumber: '303C', top: 93, left: 4, vertical: false },
];

const Home = () => {
  const { rooms } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    return {
      ready: subscription.ready(),
      rooms: Rooms.find().fetch(),
    };
  });
  const roomIds = rooms.map(room => room._id);
  const roomData = roomIds.map(room => getRoomData(room));
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

  const occupantIconImage = (occupant) => {
    const occupantWithImage = `center / contain url(${occupant.image})`;
    const noImage = 'rgba(200, 200, 200) center';
    return occupant.image ? occupantWithImage : noImage;
  };

  return (
    <Container id={PAGE_IDS.HOME} className="py-3">
      <Row className="d-flex justify-content-between">
        <div style={{ width: '25rem' }}>
          Rooms Occupied
          <ProgressBar now={45} />
        </div>
        <div style={{ width: '25rem' }}>
          Rooms Vacant
          <ProgressBar variant="info" now={9} />
        </div>
        <div style={{ width: '25rem' }}>
          Rooms Out of Commission
          <ProgressBar variant="danger" now={2} />
        </div>
      </Row>
      <Row className="simple-card">
        <Col>
          <h2 style={{ margin: '15px 0' }}>Pacific Ocean Science and Technology - 300 Level</h2>
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
              {roomData.map(room => {
                const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                if (roomPosition) {
                  const roomPositionTop = (roomPosition.top / 100) * MAP_HEIGHT;
                  const roomPositionLeft = (roomPosition.left / 100) * MAP_WIDTH;
                  const COLLISION_SPACING = 6;
                  return room.occupants.map((occupant, index) => {
                    const iconId = `${room.roomNumber}-${index}`;
                    return (
                      <OverlayTrigger trigger="hover" defaultShow={false} placement="bottom" overlay={<Tooltip>{`${occupant.firstName} ${occupant.lastName}`}</Tooltip>}>
                        <div
                          className="map-icon map-icon-occupant"
                          id={iconId}
                          style={{
                            top: roomPosition.vertical ? `${roomPositionTop + (COLLISION_SPACING * (index + 1)) - 7}px` : `${roomPositionTop - 12}px`,
                            left: roomPosition.vertical ? `${roomPositionLeft + 2}px` : `${roomPositionLeft + (COLLISION_SPACING * (index + 1)) - 4}px`,
                            background: occupantIconImage(occupant),
                          }}
                        />
                      </OverlayTrigger>
                    );
                  });
                }
                return null;
              })} {
                rooms.map(room => {
                  const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                  if (roomPosition) {
                    const roomPositionTop = (roomPosition.top / 100) * MAP_HEIGHT;
                    const roomPositionLeft = (roomPosition.left / 100) * MAP_WIDTH;
                    return (
                      <div
                        className="map-icon map-icon-room"
                        style={{
                          top: roomPosition.vertical ? `${roomPositionTop + 25}px` : `${roomPositionTop + 12}px`,
                          left: `${roomPositionLeft - 4}px`,
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
          <h2 style={{ margin: '15px 0' }}>List View</h2>
          <h3 style={{ fontSize: '1.1rem' }}>Unassigned Faculties</h3>
          <h3 style={{ fontSize: '1.1rem' }}>Rooms Vacant</h3>
          <h3 style={{ fontSize: '1.1rem' }}>Rooms Out of Commission</h3>
          <h3 style={{ fontSize: '1.1rem' }}>Rooms Occupied</h3>
        </Col>
      </Row>
      <Row className="simple-card">
        <FacultyTable />
      </Row>
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE, ROLE.FACULTY, ROLE.TECH]) ? (
        <Row className="simple-card">
          <ReservationsTable />
        </Row>
      ) : ''}
    </Container>
  );
};

export default Home;
