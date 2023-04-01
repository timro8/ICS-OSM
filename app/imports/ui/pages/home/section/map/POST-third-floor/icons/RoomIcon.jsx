import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import roomPositions from '../../../../../../../api/room/RoomPositions';

const RoomIcon = (props) => {

  const [show, setShow] = useState(false);
  const [roomIndex, setRoomIndex] = useState(null);
  const handleClose = () => { setRoomIndex(null); setShow(false); };

  const getRoomColor = (status) => {
    if (status === 'Out of Commission') {
      return '#dc3545';
    }
    return '#fff';
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
              top: room.status === 'Occupied' ? `${roomPositionTop + 12}px` : `${roomPositionTop}px`,
              left: `${roomPositionLeft}px`,
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
