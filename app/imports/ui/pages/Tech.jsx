import React from 'react';
import { _ } from 'meteor/underscore';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/room/RoomCollection';
import { RoomEquipments } from '../../api/room/RoomEquipments';
import { RoomJacks } from '../../api/room/RoomJacks';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';

function getEquipmentData(equipment) {
  // get the room number, location from Rooms Collection and extend the equipment data

  const room = Rooms.find({ _id: equipment.roomId }).fetch();
  return _.extend({}, equipment, room);
}

function getJackData(jack) {
  // get the room number, location from Rooms Collection and extend the jacks data
  const room = Rooms.find({ _id: jack.roomId }).fetch();
  return _.extend({}, jack, room);
}

const Tech = () => {
  const { equipment, jacks, ready } = useTracker(() => {
    // Get room subscription
    const subRoom = Rooms.subscribeRoom();

    // Get equipment subscription
    const subEquipment = RoomEquipments.subscribeRoomEquipment();

    // Get jack subscription
    const subJack = RoomJacks.subscribeRoomJacks();

    // Determine if the subscriptions are ready
    const rdy = subRoom.ready() && subEquipment.ready() && subJack.ready();

    const documentEquipment = RoomEquipments.find({}).fetch();
    const documentJack = RoomJacks.find({}).fetch();
    // return when subscriptions are completed
    return {
      equipment: documentEquipment,
      jacks: documentJack,
      ready: rdy,
    };
  });
  document.title = 'Tech';
  const equipmentData = equipment.map(e => getEquipmentData(e));
  const jackData = jacks.map(j => getJackData(j));

  return (ready ? (
    <Container className="py-3">
      <Container id={PAGE_IDS.TECH}>
        <Row>
          <Col>
            <h1>Equipment</h1>
            <Table responsive bordered hover size="sm">
              <thead>
                <tr>
                  <th>Qty</th>
                  <th>Room Number</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {equipmentData.map((e, index) => (
                  <tr key={index}>
                    <td>{e.quantity}</td>
                    <td>{e[0].roomNumber}</td>
                    <td>{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Data Jacks</h1>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Room Number</th>
                  <th>Jack Number</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {jackData.map((j, index) => (
                  <tr key={index}>
                    <td>{j[0].roomNumber}</td>
                    <td>{j.jackNumber}</td>
                    <td>{j.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner message="Loading tech data" />);
};

export default Tech;
