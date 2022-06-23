import './_tooltip.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useHover, ToggleLayer, Transition } from 'react-laag';
// eslint-disable-next-line
import ResizeObserver from 'resize-observer-polyfill';
import classNames from 'classnames';

const Tooltip = ({
  children, text, placement, offset, container, type,
}) => {
  const [show, hoverProps] = useHover({ delayEnter: 100, delayLeave: 200 });

  return (
    <ToggleLayer
      ResizeObserver={ResizeObserver}
      isOpen={show}
      fixed
      container={() => document.querySelector(container)}
      placement={{
        anchor: placement, autoAdjust: true, snapToAnchor: true, triggerOffset: offset,
      }}
      renderLayer={({ isOpen, layerProps }) => (
        <Transition isOpen={isOpen}>
          {(isOpen, onTransitionEnd) => (
            <div
              ref={layerProps.ref}
              className={classNames('tooltip__block', {
                'tooltip__block-error': type === 'error',
                'tooltip__block-success': type === 'success',
                'tooltip__block-warning': type === 'warning',
              })}
              onTransitionEnd={onTransitionEnd}
              style={{
                ...layerProps.style,
                padding: '2px 8px',
                transformOrigin: 'center center',
                borderRadius: '4px',
                zIndex: 10000000,
                maxWidth: '170px',
                textAlign: 'center',
                transition: 'all 0.2s',
                transform: isOpen ? 'scale(1)' : 'scale(0)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {text}
            </div>
          )}
        </Transition>
      )}
    >
      {({ triggerRef }) => (
        <span
          ref={triggerRef}
          {...hoverProps}
          style={{
            color: '#1a73a7',
            cursor: 'pointer',
          }}
        >
          {children}
        </span>
      )}
    </ToggleLayer>
  );
};

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.node]),
  text: PropTypes.string,
  placement: PropTypes.string,
  offset: PropTypes.number,
  container: PropTypes.string,
  type: PropTypes.string,
};

Tooltip.defaultProps = {
  placement: 'TOP_CENTER',
  offset: 4,
  container: 'body',
};

export default Tooltip;
