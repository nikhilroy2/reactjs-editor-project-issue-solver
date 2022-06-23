import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import typeColor from './utils/validationColor';

import Color from './helpers/color';

import Board from './Board';
import Ribbon from './Ribbon';
import Alpha from './Alpha';

const Panel = ({
  alpha, className, color, onChange, prefixCls,
}) => {
  const node = useRef(null);

  const colorConvert = new Color(color);
  const [state, setState] = useState({
    color: colorConvert,
    alpha,
  });

  useEffect(() => {
    setState({
      color: new Color(color),
      alpha,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, alpha]);

  const wrapClasses = classNames({
    [`${prefixCls}-wrap`]: true,
    [`${prefixCls}-wrap-has-alpha`]: true,
  });

  const handleAlphaChange = (alpha) => {
    const { color } = state;
    color.alpha = alpha;

    setState({
      alpha,
      color,
    });
    onChange({
      color: color.toHexString(),
      alpha,
    });
  };

  const handleChange = (color) => {
    const { alpha } = state;
    color.alpha = alpha;

    setState({ ...state, color, alpha: color.alpha });
    onChange({
      color: color.toHexString(),
      alpha: color.alpha,
    });
  };

  return (
    // eslint-disable-next-line
    <div ref={node} role="article" className={[prefixCls, className].join(' ')} tabIndex={0}>
      <div className={`${prefixCls}-inner`}>
        <Board rootPrefixCls={prefixCls} color={state.color} onChange={handleChange} />
        <div className={wrapClasses}>
          <div className={`${prefixCls}-wrap-ribbon`}>
            <Ribbon rootPrefixCls={prefixCls} color={state.color} onChange={handleChange} />
          </div>
          <div className={`${prefixCls}-wrap-alpha`}>
            <Alpha rootPrefixCls={prefixCls} alpha={state.alpha} color={state.color} onChange={handleAlphaChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

Panel.propTypes = {
  alpha: PropTypes.number,
  className: PropTypes.string,
  color: typeColor,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
};

Panel.defaultProps = {
  className: '',
  alpha: 100,
  color: '#ff0000',
  onChange: () => ({}),
  prefixCls: 'rc-color-picker-panel',
};

export default Panel;
