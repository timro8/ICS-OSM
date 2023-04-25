import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CircleButton = ({ children, onClick, variant }) => (
  <Button
    id="add-button"
    variant={variant}
    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
    onClick={onClick}
  >
    {children}
  </Button>
);

CircleButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};

export default CircleButton;
