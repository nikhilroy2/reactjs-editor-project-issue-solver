import './_mark.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as IconClear } from '../../../../../assets/img/clear.svg';

const MarkIndicator = ({ onClick, style }) => (
  <span className="editor__mark-indicator" onClick={onClick} style={style && style}>
    <IconClear />
  </span>
);

MarkIndicator.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default MarkIndicator;
