import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import roomPositions from '../../../../../../../api/room/RoomPositions';

const RoomIcon = (props) => {
  const getRoomColor = (status) => {
    if (status === 'Out of Commission') {
      return '#dc3545';
    }
    return '#fff';
  };

  const roomPopover = room => (
    <Tooltip>
      <br />
      <p><strong>Capacity:</strong> {room.capacity}</p>
      <p><strong>Status:</strong> {room.status}</p>
      <p><strong>Classification:</strong> {room.roomClassification}</p>
      <p><strong>Size:</strong> {room.roomSqFoot} sq. ft.</p>
    </Tooltip>
  );

  return props.rooms.map((room) => {
    const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
    if (roomPosition) {
      const roomPositionTop = (roomPosition.top / 100) * props.mapHeight;
      const roomPositionLeft = (roomPosition.left / 100) * props.mapWidth;
      return (
        <Link to={`/roomdetails/${room._id}`}>
          <OverlayTrigger trigger={['hover', 'focus']} defaultShow={false} placement="bottom" overlay={roomPopover(room)}>
            <button
              type="button"
              className="map-icon map-icon-room"
              style={{
                top: room.status === 'Occupied' ? `${roomPositionTop + 12}px` : `${roomPositionTop}px`,
                left: `${roomPositionLeft}px`,
                color: getRoomColor(room.status),
              }}
            >
              {room.roomNumber}
            </button>
          </OverlayTrigger>
        </Link>
      );
    }
    return null;
  });
};

export default RoomIcon;
