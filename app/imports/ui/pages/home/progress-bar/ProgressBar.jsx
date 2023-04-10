import { ProgressBar } from 'react-bootstrap';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../../../api/room/RoomCollection';
import { getRoomData } from '../../../../api/utilities/getRoomData';

const ProgressBars = () => {
  const { rooms } = useTracker(() => {
    const subscription = Rooms.subscribeRoom();
    return {
      ready: subscription.ready(),
      rooms: Rooms.find().fetch(),
    };
  });

  const roomIds = rooms.map(room => room._id);
  const roomsData = roomIds.map(room => getRoomData(room));

  const amtVacant = roomsData.filter(room => room.status === 'Vacant').length;
  const amtOutOfCommission = roomsData.filter(room => room.status === 'Out of Comission').length;
  const amtOccupied = roomsData.filter(room => room.status === 'Occupied').length;

  const totalRooms = roomsData.length;

  const getPercentage = (number, total) => (number / total) * 100;

  return (
    <>
      <div style={{ width: '25rem' }}>
        Vacant
        <ProgressBar now={getPercentage(amtVacant, totalRooms)} label={amtVacant} />
      </div>
      <div style={{ width: '25rem' }}>
        Occupied
        <ProgressBar now={getPercentage(amtOccupied, totalRooms)} label={amtOccupied} />
      </div>
      <div style={{ width: '25rem' }}>
        Out of commission
        <ProgressBar now={getPercentage(amtOutOfCommission, totalRooms)} label={amtOutOfCommission} />
      </div>
    </>
  );
};

export default ProgressBars;
