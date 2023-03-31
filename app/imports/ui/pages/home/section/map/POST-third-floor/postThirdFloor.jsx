import { Button, Col, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import * as d3 from 'd3';
import roomPositions from '../../../../../../api/room/RoomPositions';
import { Rooms } from '../../../../../../api/room/RoomCollection';
import { getRoomData } from '../../../../../../api/utilities/getRoomData';
import ListView from './list-view/listView';

const PostThirdFloor = () => {

  const MAP_ASPECT_RATIO = 1.2704;
  const MAP_WIDTH = 900;
  const MAP_HEIGHT = MAP_WIDTH / MAP_ASPECT_RATIO;
  const COLLISION_SPACING = 6;

  const { rooms } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    return {
      ready: subscription.ready(),
      rooms: Rooms.find().fetch(),
    };
  });
  const roomIds = rooms.map(room => room._id);
  const roomData = roomIds.map(room => getRoomData(room));

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

  const getOccupantIconImage = (occupant) => {
    const occupantWithImage = `center / contain url(${occupant.image})`;
    const noImage = 'rgba(200, 200, 200) center';
    return occupant.image ? occupantWithImage : noImage;
  };

  const [show, setShow] = useState(false);
  const [roomIndex, setRoomIndex] = useState(null);
  const handleClose = () => { setRoomIndex(null); setShow(false); };

  const getRoomColor = (status) => {
    if (status === 'Out of commission') {
      return 'red';
    }
    if (status === 'Occupied') {
      return 'blue';
    }
    if (status === 'Vacant') {
      return 'yellow';
    }
    return 'gray';
  };

  return (
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
                return room.occupants.map((occupant, index) => (
                  <OverlayTrigger trigger={['hover', 'focus']} defaultShow={false} placement="bottom" overlay={<Tooltip>{`${occupant.firstName} ${occupant.lastName}`}</Tooltip>}>
                    <div
                      className="map-icon map-icon-occupant"
                      style={{
                        top: roomPosition.vertical ? `${roomPositionTop + (COLLISION_SPACING * (index + 1)) - 7}px` : `${roomPositionTop - 12}px`,
                        left: roomPosition.vertical ? `${roomPositionLeft + 2}px` : `${roomPositionLeft + (COLLISION_SPACING * (index + 1)) - 4}px`,
                        background: getOccupantIconImage(occupant),
                      }}
                    />
                  </OverlayTrigger>
                ));
              }
              return null;
            })} {
              rooms.map((room, index) => {
                const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
                if (roomPosition) {
                  const roomPositionTop = (roomPosition.top / 100) * MAP_HEIGHT;
                  const roomPositionLeft = (roomPosition.left / 100) * MAP_WIDTH;
                  return (
                    <>
                      <button
                        type="button"
                        className="map-icon map-icon-room"
                        onClick={() => {
                          setRoomIndex(index);
                          setShow(true);
                        }}
                        style={{
                          top: roomPosition.vertical ? `${roomPositionTop + 25}px` : `${roomPositionTop + 12}px`,
                          left: `${roomPositionLeft - 4}px`,
                          borderColor: getRoomColor(room.status),
                          color: getRoomColor(room.status),
                        }}
                      >
                        {room.roomNumber}
                      </button>
                      {roomIndex === index && (
                        <Modal show={show} onHide={handleClose} id={index}>
                          <Modal.Header closeButton>
                            <Modal.Title>Room {room.roomNumber} Details</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Room info!{room.location}
                            <div>
                              {room.status}
                              {room.capacity}
                              {room.roomSqFoot}
                              {room.roomClassification}
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      )}
                    </>
                  );
                }
                return null;
              })
            }
          </div>
        </div>
      </Col>
      <Col>
        <ListView />
      </Col>
    </Row>
  );
};

export default PostThirdFloor;
