import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

const AddFacultyForm = props => {

    if (!props.show) {
        return null
    }

    // pop up window: https://react-bootstrap.github.io/components/modal/
    return (
        <Modal show={props.show}>
            <Modal.Header closeButton onClick={props.onClose}>
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
                <Button variant="danger" onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant="success">
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default AddFacultyForm;
