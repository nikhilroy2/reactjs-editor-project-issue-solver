import './_select_borders.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BordersLst from './components/list';

const SelectBorders = ({ value, onChange }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="editor__elements-select_borders">
      <div className="elements-select_borders_select" onClick={() => setOpen(!isOpen)}>
        <span className="elements-select_borders_select--text">{value}</span>
        <span className="elements-select_borders_select--triangle" />
      </div>
      {isOpen && <BordersLst activeItem={value} setActiveBorder={onChange} setOpen={setOpen} isOpen={isOpen} />}
    </div>
  );
};

SelectBorders.defaultProps = {
  value: 'none',
};

SelectBorders.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectBorders;
