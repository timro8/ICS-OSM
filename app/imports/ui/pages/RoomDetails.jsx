import React from 'react';
import { Col, Row, Container, Table, ListGroup, Image, Button, ButtonGroup } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const RoomDetails = () => (
  <Container className="py-3">
    <h1>Room 3xx Details</h1>
    <Row className="py-3">
      <Col>
        <h2>Occupant</h2>
        <p>First name: John</p>
        <p>Last name: Doe</p>
        <p>Email: john@foo.com</p>
      </Col>
      <Col>
        <p>Room Status: Occupied</p>
        <p>Capacity: 2</p>
        <Image src="https://www.hawaii.edu/news/wp-content/uploads/2016/03/manoa-post-building.jpg" width={80} />
        <br />
        <ButtonGroup className="mb-2">
          <Button>Add Occupant</Button>
          <Button>Edit Occupant</Button>
        </ButtonGroup>
      </Col>
    </Row>
    <Row className="py-3">
      <Col>
        <h2>Equipment</h2>
        <Table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Details/Serial Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chair</td>
              <td>3</td>
              <td />
            </tr>
            <tr>
              <td>Desk</td>
              <td>5</td>
              <td />
            </tr>
            <tr>
              <td>Phone</td>
              <td>1</td>
              <td>9876</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>1</td>
              <td>9877</td>
            </tr>
          </tbody>
        </Table>
        <ButtonGroup className="mb-2">
          <Button>Add Equipment</Button>
          <Button>Edit Equipment</Button>
        </ButtonGroup>
      </Col>
      <Col>
        <h2>Data Jacks</h2>
        <h3>Port numbers</h3>
        <ListGroup as="ol" numbered>
          <ListGroup.Item as="li">12345</ListGroup.Item>
          <ListGroup.Item as="li">12346</ListGroup.Item>
          <ListGroup.Item as="li">12347</ListGroup.Item>
        </ListGroup>
        <ButtonGroup className="mb-2">
          <Button>Add Data Jacks</Button>
          <Button>Edit Data Jacks</Button>
        </ButtonGroup>
      </Col>
      <Col>
        <h2>Room Notes</h2>
        <ListGroup>
          <ListGroup.Item>
            <p>Date: 3/5/2022</p>
            <p>replaced furniture</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Date: 5/5/2021</p>
            <p>activated jack 12347</p>
          </ListGroup.Item>
        </ListGroup>
        <Button>Add Note</Button>
      </Col>
    </Row>
  </Container>

);

export default RoomDetails;
