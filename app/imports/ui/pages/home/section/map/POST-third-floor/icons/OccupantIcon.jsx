import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import roomPositions from '../../../../../../../api/room/RoomPositions';

const OccupantIcon = (props) => {
  const COLLISION_SPACING = 6;
  const getOccupantIconImage = (occupant) => {
    const occupantWithImage = `center / contain url(${occupant.image})`;
    const noImage = 'rgba(200, 200, 200) center';
    return occupant.image ? occupantWithImage : noImage;
  };

  return props.roomData.map(room => {
    const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
    if (roomPosition) {
      const roomPositionTop = (roomPosition.top / 100) * props.mapHeight;
      const roomPositionLeft = (roomPosition.left / 100) * props.mapWidth;
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
  });
};

export default OccupantIcon;
