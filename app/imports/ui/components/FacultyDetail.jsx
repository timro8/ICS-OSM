import React from 'react';
import { Modal } from 'react-bootstrap';

const FacultyDetail = props => {

    if (!props.show) {
        return null
    }
    // pop up window: https://react-bootstrap.github.io/components/modal/

    return (
        <Modal show={props.show}>
            <Modal.Header closeButton onClick={props.onClose}/>
            <Modal.Body>
                Room # <br/>
                Name <br/>
                Phone number <br/>
                Email <br/>
                Office hours <br/>
                Role
            </Modal.Body>
        </Modal>
    );
}


export default FacultyDetail;
