import React from 'react';
import { Card, Container, ProgressBar, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Landing = () => (
  <Container id={PAGE_IDS.HOME} className="py-3">
    <h1>Hi (user), Good Morning</h1>
    <Row>
      <h2>Total</h2>
      <ProgressBar>
        <ProgressBar variant="success" now={83} key={1} />
        <ProgressBar variant="warning" now={14} key={2} />
        <ProgressBar variant="danger" now={3} key={3} />
      </ProgressBar>
    </Row>
    <Row>
      <h2>Pacific Ocean Science and Technology</h2>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Occupied</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>45</Card.Text>
          <ProgressBar now={45} />
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Vacant</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>9</Card.Text>
          <ProgressBar variant="info" now={9} />
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Out of Commission</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>2</Card.Text>
          <ProgressBar variant='danger' now={2} />
        </Card.Body>
      </Card>
    </Row>
    <Row>
      <h2>Keller Hall</h2>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Occupied</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>42</Card.Text>
          <ProgressBar now={42} />
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Vacant</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>3</Card.Text>
          <ProgressBar now={3} />
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>Rooms Out of Commission</Card.Title>
          <Card.Text style={{ fontSize: '3rem' }}>0</Card.Text>
          <ProgressBar variant='danger' now={0} />
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
