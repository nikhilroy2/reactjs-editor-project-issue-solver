import React from 'react';
import PropTypes from 'prop-types';

import TriangleIndicator from '../ui/triangle';
import MarkIndicator from '../ui/mark';

const Indicator = ({ value, onClearSelect, style }) => (
  <div
    onMouseDown={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
  >
    {value && <MarkIndicator onClick={onClearSelect} style={style} />}
    <TriangleIndicator />
  </div>
);

Indicator.propTypes = {
  value: PropTypes.string,
  onClearSelect: PropTypes.func,
  style: PropTypes.object,
};

export default Indicator;
