import React from 'react';
import { Card, Container, ProgressBar, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Landing = () => (
  <Container id={PAGE_IDS.HOME} className="py-3">
    <h1>Hi, Good Morning</h1>
    <Row>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Occupied</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>45</Card.Text>
          <ProgressBar now={70} />
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Vacant</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>4</Card.Text>
          <ProgressBar now={20} />
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Out of Commission</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>2</Card.Text>
          <ProgressBar variant='danger' now={10} />
        </Card.Body>
      </Card>
    </Row>
    <Row>
      <Card style={{ width: '30rem' }}>
        <Card.Header>Equipments</Card.Header>
        <Card.Body>
          <Card.Text>Total Computers: 150</Card.Text>
          <Card.Text>Total Network Jacks: 300</Card.Text>
          <Card.Text>Total Phone Jacks: 300</Card.Text>
        </Card.Body>
      </Card>
    </Row>
  </Container>
);

export default Landing;
