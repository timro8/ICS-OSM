import React from 'react';
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Image, Row} from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const AddFaculty = () => (
  <Container className="py-3">
    <Container style={{margin: '1vw', fontWeight: 'bold'}}>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Room</Form.Label>
                <Form.Select>
                    <option>Room 1</option>
                    <option>Room 2</option>
                    <option>Room 3</option>
                </Form.Select>
                <br/>
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Name..."/>
                <br/>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="Phone Number (optional)"/>
                <br/>
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Email..."/>
                <br/>
                <Form.Label>Office Hours</Form.Label>
                <Form.Control placeholder="Office Hours..."/>
                <br/>
                <Form.Label>Roles</Form.Label>
                <Form.Select>
                    <option>Professor</option>
                    <option>TA</option>
                    <option>GA</option>
                </Form.Select>
            </Form.Group>
            <Row>
                <Col style={{display: 'grid', justifyContent: 'center', gridAutoFlow: 'column', gridColumnGap: '10px'}}>
                    <a href="/faculty" className="btn btn-danger" role="button">Cancel</a>
                    <Button className="btn btn-success">Add</Button>
                </Col>
            </Row>
        </Form>
    </Container>
  </Container>
);

export default AddFaculty;
