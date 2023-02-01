import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FacultyDetail = props => {

  const { show, onClose, image } = props;
  if (!show) {
    return null;
  }
  // pop up window: https://react-bootstrap.github.io/components/modal/

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={onClose} />
      <Modal.Body>
        <div style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column' }}>
          <Image className="justify-content-md-center" style={{ borderRadius: '100%', width: '13rem', height: '13rem' }} src={image} />
        </div>
        Name <br />
        Room Number <br />
        Email <br />
        Office hours <br />
        Phone number <br />
        Role
      </Modal.Body>
    </Modal>
  );
};

FacultyDetail.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  image: PropTypes.string,
};

FacultyDetail.defaultProps = {
  show: false,
  onClose: null,
  image: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
};

export default FacultyDetail;
