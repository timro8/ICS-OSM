import React, { useState } from 'react';
import {Button, Card, Container, Form, Modal, Row, Stack} from 'react-bootstrap';
import {Search} from "react-bootstrap-icons";

/* A simple static component to render some text for the landing page. */
const Faculty = () => {
    // pop up window: https://react-bootstrap.github.io/components/modal/
    // show pop up to add faculty
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // show pop up to show faculty detail information
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    function cards(room, name, office_hours){
        return (
                <Card className="m-2" style={{fontWeight: "bold", width: "250px"}} onClick={handleShowDetail}>
                    <Card.Body>
                        <Card.Text>{room}</Card.Text>
                        <Card.Text>{name}</Card.Text>
                        <Card.Text>{office_hours}</Card.Text>
                        <Button className="faculty-card-button">Edit</Button>
                    </Card.Body>
                </Card>
        );
    }

    return (
        <>
        <Container className="py-3">
            <Container className="faculty-page">

                <Container className="d-flex align-items-center justify-content-center">
                    <Form className="search-input">
                        <Form.Control placeholder="Search..."/>
                        <Button><Search/></Button>
                    </Form>
                </Container>

                <Button style={{marginLeft: "1vw", marginBottom: "10px"}} variant="primary" onClick={handleShow}>Add Faculty</Button>

                <Container className="d-flex align-items-center justify-content-center">
                    <Row>
                        {cards(307, "Cam Moore", "Office Hours")}
                        {cards(307, "Cam Moore", "Office Hours")}
                        {cards(307, "Cam Moore", "Office Hours")}
                        {cards(307, "Cam Moore", "Office Hours")}
                        {cards(309, "Person 1, 2, 3", "Office Hours")}
                        {cards(309, "Person 1, 2, 3", "Office Hours")}
                        {cards(309, "Person 1, 2, 3", "Office Hours")}
                    </Row>
                </Container>
            </Container>
        </Container>

            {/* Add Faculty Form */}
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

            {/* Show detail information of faculty */}
            <Modal show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    Room # <br/>
                    Name <br/>
                    Phone number <br/>
                    Email <br/>
                    Office hours <br/>
                    Role
                </Modal.Body>
            </Modal>
        </>
    );
}


export default Faculty;
