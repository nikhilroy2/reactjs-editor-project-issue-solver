import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Ribbon = ({ rootPrefixCls, color, onChange }) => {
  const node = useRef();

  const pointMoveTo = (coords) => {
    const rect = node && node.current && node.current.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const { width } = rect;
    let left = coords.x - rect.left;
    left = Math.max(0, left);
    left = Math.min(left, width);

    const huePercent = left / width;
    const hue = huePercent * 360;

    color.hue = hue;

    onChange(color);
  };

  const onMouseDown = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    pointMoveTo({
      x,
      y,
    });
    // eslint-disable-next-line
    window.addEventListener('mousemove', onDrag);
    // eslint-disable-next-line
    window.addEventListener('mouseup', onDragEnd);
  };

  const onDrag = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    pointMoveTo({
      x,
      y,
    });
  };

  const onDragEnd = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    pointMoveTo({
      x,
      y,
    });
    // eslint-disable-next-line
    removeListeners();
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  useEffect(() => () => {
    removeListeners();
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const getPrefixCls = () => `${rootPrefixCls}-ribbon`;

  const prefixCls = getPrefixCls();
  const { hue } = color;
  const per = (hue / 360) * 100;

  return (
    <div className={prefixCls} ref={node}>
      <div className="rc-color-picker-panel-ribbon-bg" />
      <span style={{ left: `${per}%` }} />
      <div className={`${prefixCls}-handler`} onMouseDown={onMouseDown} />
    </div>
  );
};

Ribbon.propTypes = {
  rootPrefixCls: PropTypes.string,
  color: PropTypes.object,
  onChange: PropTypes.func,
};

export default Ribbon;
