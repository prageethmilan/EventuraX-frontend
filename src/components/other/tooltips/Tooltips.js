import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const Tooltips = ({ id, children, title}) => {
  return (
      <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  )
}

export default Tooltips;
