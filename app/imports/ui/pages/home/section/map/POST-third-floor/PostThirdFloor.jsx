import { Col, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import * as d3 from 'd3';
import { Rooms } from '../../../../../../api/room/RoomCollection';
import { getRoomData } from '../../../../../../api/utilities/getRoomData';
import ListView from './list-view/ListView';
import OccupantIcon from './icons/OccupantIcon';
import RoomIcon from './icons/RoomIcon';

const PostThirdFloor = () => {

  const MAP_ASPECT_RATIO = 1.2704;
  const MAP_WIDTH = 900;
  const MAP_HEIGHT = MAP_WIDTH / MAP_ASPECT_RATIO;

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

  return (
    <Row className="simple-card map-section">
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
            <OccupantIcon roomData={roomData} mapHeight={MAP_HEIGHT} mapWidth={MAP_WIDTH} />
            <RoomIcon rooms={rooms} mapHeight={MAP_HEIGHT} mapWidth={MAP_WIDTH} />
          </div>
        </div>
      </Col>
      <Col className="list-view">
        <ListView rooms={rooms} />
      </Col>
    </Row>
  );
};

export default PostThirdFloor;
