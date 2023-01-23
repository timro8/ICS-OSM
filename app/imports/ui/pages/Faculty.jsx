import React, { useState } from 'react';
import {Button, Card, Container, Form, Modal, Stack} from 'react-bootstrap';
import {Search} from "react-bootstrap-icons";

/* A simple static component to render some text for the landing page. */
const Faculty = () => {
    // pop up window: https://react-bootstrap.github.io/components/modal/
    // <a href="/addFaculty" className="btn btn-primary" role="button">Add Faculty</a>
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    return (
        <>
        <Container className="py-3">
            <Container className="faculty-page">
                <Form className="search-bar">
                    <Form.Control placeholder="Search..."/>
                    <Button><Search/></Button>
                </Form>
                <Button variant="primary" onClick={handleShow}>Add Faculty</Button>
                <Stack>
                    <Card className="faculty-card" onClick={handleShowDetail}>
                        <Card.Body>
                            <Card.Text>307</Card.Text>
                            <Card.Text>Cam Moore</Card.Text>
                            <Button>Edit</Button>
                        </Card.Body>
                    </Card>
                    <Card className="faculty-card">
                        <Card.Body>
                            <Card.Text>309 - Person 1, 2, 3</Card.Text>
                            <Card.Text>Phone #</Card.Text>
                            <Card.Text>Office Hours</Card.Text>
                            <Button>Edit</Button>
                        </Card.Body>
                    </Card>
                </Stack>
            </Container>
        </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Faculty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{display: 'grid', justifyContent: 'center', gridAutoFlow: 'column', gridColumnGap: '10px'}}>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Room #</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Name <br/>
                    Phone number <br/>
                    email <br/>
                    office hours <br/>
                    role
                </Modal.Body>
            </Modal>
        </>
    );
}


export default Faculty;
