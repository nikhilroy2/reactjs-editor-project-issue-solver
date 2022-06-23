import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './_swipe.scss';
import { CSSTransition } from 'react-transition-group';
import { useDebounce } from 'use-debounce';

export const Swipe = ({ active, children }) => {
  const [overflow, setOverflow] = useState(false);
  const [debounceStart] = useDebounce(overflow, 500);

  useEffect(() => {
    setOverflow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceStart]);

  useEffect(() => {
    setOverflow(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const Children = children.map((child, index) => React.cloneElement(child, {
    active,
    last: children.length - 1 === index,
  }));
  return (
    <div className="editor__swipe" style={{ overflow: overflow ? 'hidden' : 'visible' }}>
      {Children}
    </div>
  );
};

Swipe.propTypes = {
  active: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const SwipeItem = ({
  active, swipeKey, children,
}) => {
  const [oldActive, setOldActive] = useState(active);
  useEffect(() => {
    setTimeout(() => {
      setOldActive(oldActive);
    }, [700]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return (
    <CSSTransition
      in={active === swipeKey}
      timeout={500}
      classNames={{
        enter: 'animated faster-3',
        enterActive: oldActive < active ? 'slideInLeft' : 'slideInRight',
        exit: 'editor__swipe-item animated faster-3',
        exitActive: oldActive < active ? 'slideOutRight' : 'slideOutLeft',
      }}
      unmountOnExit
    >
      <div>{children}</div>
    </CSSTransition>
  );
};

SwipeItem.propTypes = {
  active: PropTypes.number,
  swipeKey: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
