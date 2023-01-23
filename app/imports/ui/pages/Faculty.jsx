import React from 'react';
import {Button, Card, CardGroup, Container, Form, Stack} from 'react-bootstrap';
import {Search} from "react-bootstrap-icons";

/* A simple static component to render some text for the landing page. */
const Faculty = () => (
    <Container className="py-3">
        <Container className="faculty-page">
            <Form className="search-bar">
                <Form.Control placeholder="Search..."/>
                <Button><Search/></Button>
            </Form>
            <a href="/addFaculty" className="btn btn-primary" role="button">Add Faculty</a>
            <Stack>
                <Card className="faculty-card">
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
);


export default Faculty;
