import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import TechJack from '../components/Tech/TechJack';
import TechEquipment from '../components/Tech/TechEquipment';

const Tech = () => {
  document.title = 'Tech';
  return (
    <Container className="py-3" id={PAGE_IDS.TECH}>
      <Tabs defaultActiveKey="jacks">
        <Tab eventKey="jacks" title="Jacks">
          <TechJack />
        </Tab>
        <Tab eventKey="equipment" title="Equipment">
          <TechEquipment />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Tech;
