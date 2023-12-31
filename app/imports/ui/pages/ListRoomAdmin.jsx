import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import RoomAdmin from '../components/Roomthings/RoomAdmin';
import RoomAdminEquipment from '../components/Roomthings/RoomAdminEquipment';
import TechJack from '../components/Tech/TechJack';
/* Renders a table containing all of the Room documents. Use <RoomItemAdmin> to render each row. */
const ListRoomAdmin = () => {
  document.title = 'Admin';
  return (
    <Container id={PAGE_IDS.LIST_ROOM_ADMIN} className="py-3">
      <Tabs defaultActiveKey="rooms">
        <Tab eventKey="rooms" title="Rooms" id="list-room-admin-rooms">
          <RoomAdmin />
        </Tab>
        <Tab eventKey="equipment" title="Equipment" id="list-room-admin-equipment">
          <RoomAdminEquipment />
        </Tab>
        <Tab eventKey="jacks" title="Jacks" id="list-room-admin-jacks">
          <TechJack />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ListRoomAdmin;
