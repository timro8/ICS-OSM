import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CircleButton = ({ children, onClick, variant, tooltip }) => (
  <OverlayTrigger
    trigger={['hover', 'focus']}
    defaultShow={false}
    placement="bottom"
    overlay={<Tooltip> {tooltip} </Tooltip>}
  >
    <Button
      id="add-button"
      variant={variant}
      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      onClick={onClick}
    >
      {children}
    </Button>
  </OverlayTrigger>
);

CircleButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default CircleButton;
