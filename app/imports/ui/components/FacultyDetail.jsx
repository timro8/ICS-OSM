import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FacultyDetail = props => {

  // eslint-disable-next-line react/prop-types
  const { show, onClose } = props;
  if (!show) {
    return null;
  }
  // pop up window: https://react-bootstrap.github.io/components/modal/

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={onClose} />
      <Modal.Body>
        Room # <br />
        Name <br />
        Phone number <br />
        Email <br />
        Office hours <br />
        Role
      </Modal.Body>
    </Modal>
  );
};

FacultyDetail.propTypes = {
  props: PropTypes.shape({
    show: PropTypes.bool,
    onClose: PropTypes.func,
  }).isRequired,
};

export default FacultyDetail;
