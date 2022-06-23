import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Animate = ({ animate, children }) => {
  const [animateClass, setAnimateClass] = useState(animate);
  useEffect(() => {
    let timeout;
    setTimeout(() => {
      setAnimateClass('');
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [])

  return (
    <div className={classNames(animateClass)}>{children}</div>
  )
};

Animate.propTypes = {
  animate: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

Animate.defaultProps = {
  animate: '',
};

export const AnimateHiddenDiv = ({ children, ...props }) => {
  const [init, setInit] = useState(false);
  let timeout;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timeout = setTimeout(() => {
      setInit(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  return <div className={init ? '' : 'overflow-hidden'} {...props}>{children}</div>;
};

AnimateHiddenDiv.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
