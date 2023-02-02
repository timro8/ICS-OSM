import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RoomResModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Dismiss</Modal.Title>
    </Modal.Header>
    <Modal.Body>this is the modal body</Modal.Body>
    <Modal.Footer>
      <Button
        variant="danger"
        onClick={() => {
          console.log('closed');
          handleClose();
        }}
      >
        Close me
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

RoomResModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RoomResModal;
