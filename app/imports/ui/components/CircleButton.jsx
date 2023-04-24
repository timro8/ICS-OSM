import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CircleButton = ({ children, key, onClick, variant }) => (
  <Button
    key={key}
    variant={variant}
    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
    onClick={onClick}
  >
    {children}
  </Button>
);

CircleButton.propTypes = {
  children: PropTypes.element.isRequired,
  key: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};

export default CircleButton;
