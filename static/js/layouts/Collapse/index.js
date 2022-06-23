import './scss/_collapse.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

import CollapseTitle from './components/title';

import { getCollapseBodyClass } from './helper';

const CollapseDefault = ({
  children, isOpen, onClick, title, reverseColor,
}) => {
  const [stopOpen, setStopOpen] = useState(false);

  const onWork = (value) => {
    setTimeout(() => {
      setStopOpen(value.isOpened)
    }, [300])
  };

  return (
    <>
      <CollapseTitle
        onClick={onClick}
        title={title}
        isOpen={isOpen}
        reverse={reverseColor}
      />
      <Collapse
        isOpened={isOpen}
        onWork={(value) => onWork(value)}
        theme={{
          collapse: getCollapseBodyClass(reverseColor, isOpen, stopOpen),
        }}
      >
        {children}
      </Collapse>
    </>
  )
};

CollapseDefault.defaultProps = {
  reverseColor: false,
};

CollapseDefault.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  reverseColor: PropTypes.bool,
};

export default CollapseDefault
