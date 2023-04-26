import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import roomPositions from '../../../../../../../api/room/RoomPositions';

const OccupantIcon = (props) => {
  const COLLISION_SPACING = 8;
  const getOccupantIconImage = (occupant) => {
    const occupantWithImage = `center / contain url(${occupant.image})`;
    const noImage = 'rgba(200, 200, 200) center';
    return occupant.image ? occupantWithImage : noImage;
  };

  return props.roomData.map(room => {
    const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
    if (roomPosition) {
      const amtOfOccupants = room.occupants.length - 1;
      const roomPositionTop = (roomPosition.top / 100) * props.mapHeight;
      const roomPositionLeft = (roomPosition.left / 100) * props.mapWidth;
      return room.occupants.map((occupant, index) => (occupant._id ? (
        <Link to={`/profile/${occupant._id}`} key={`${occupant._id}`}>
          <OverlayTrigger trigger={['hover', 'focus']} defaultShow={false} placement="bottom" overlay={<Tooltip>{`${occupant.firstName} ${occupant.lastName}`}</Tooltip>}>
            <div
              className="map-icon map-icon-occupant"
              style={{
                top: `${roomPositionTop - 11}px`,
                left: `${roomPositionLeft + (COLLISION_SPACING * index) + 7 - (amtOfOccupants * 3)}px`,
                background: getOccupantIconImage(occupant),
              }}
            />
          </OverlayTrigger>
        </Link>
      ) : undefined));
    }
    return null;
  });
};

export default OccupantIcon;
