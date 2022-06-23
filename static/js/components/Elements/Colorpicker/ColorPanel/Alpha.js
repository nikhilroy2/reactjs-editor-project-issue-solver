import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const rgbaColor = (r, g, b, a) => `rgba(${[r, g, b, a / 100].join(',')})`;

const Alpha = ({
  rootPrefixCls, color, alpha, onChange,
}) => {
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

    const alpha = Math.round((left / width) * 100);

    onChange(alpha);
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

  const onMouseDown = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    pointMoveTo({
      x,
      y,
    });

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
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

  const getBackground = () => {
    const { red, green, blue } = color;
    const opacityGradient = `linear-gradient(to right, ${rgbaColor(red, green, blue, 0)} , ${rgbaColor(
      red,
      green,
      blue,
      100,
    )})`;

    return opacityGradient;
  };

  const getPrefixCls = () => `${rootPrefixCls}-alpha`;

  const getPointerBackground = () => {
    const { red, green, blue } = color;
    const alphaVal = alpha / 100;

    return `rgba(${red}, ${green}, ${blue}, ${alphaVal})`;
  };

  const prefixCls = getPrefixCls();

  return (
    <div className={prefixCls} ref={node}>
      <div className={`${prefixCls}-bg`} style={{ background: getBackground() }} />
      <span
        style={{
          left: `${alpha}%`,
          backgroundColor: getPointerBackground(),
        }}
      />
      <div className={`${prefixCls}-handler`} onMouseDown={onMouseDown} />
    </div>
  );
};

Alpha.propTypes = {
  rootPrefixCls: PropTypes.string,
  color: PropTypes.object,
  alpha: PropTypes.number,
  onChange: PropTypes.func,
};

export default Alpha;
