import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import roomPositions from '../../../../../../../api/room/RoomPositions';

const RoomIcon = (props) => {

  const [show, setShow] = useState(false);
  const [roomIndex, setRoomIndex] = useState(null);
  const handleClose = () => { setRoomIndex(null); setShow(false); };

  const getRoomColor = (status) => {
    switch (status) {
    case 'Out of commission':
      return '#dc3545';
    case 'Occupied':
      return '#007bff';
    case 'Vacant':
      return '#ffc107';
    default:
      return 'gray';
    }
  };

  return props.rooms.map((room, index) => {
    const roomPosition = roomPositions.find(element => element.roomNumber === room.roomNumber);
    if (roomPosition) {
      const roomPositionTop = (roomPosition.top / 100) * props.mapHeight;
      const roomPositionLeft = (roomPosition.left / 100) * props.mapWidth;
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
  });
};

export default RoomIcon;
