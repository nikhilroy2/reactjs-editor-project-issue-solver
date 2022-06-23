import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

const ResizeBlock = ({ value, direction, onChange }) => {
  const node = useRef(null);
  const tooltipNode = useRef(null);
  const directionTop = direction === 'top';
  const directionBottom = direction === 'bottom';
  // n, e, s, w
  useEffect(() => {
    $(node.current).resizable({
      handles: directionTop ? 's' : 'n',
      minHeight: 0,
      maxHeight: 500,
      start: (event) => {
        event.target.classList.add('editor__resizebox-active');
        node.current.classList.add('editor__resizeblock-active');
        tooltipNode.current.classList.add('editor__resizeblock-tooltip-active');
      },
      stop: (event, ui) => {
        event.target.classList.remove('editor__resizebox-active');
        node.current.classList.remove('editor__resizeblock-active');
        tooltipNode.current.classList.remove('editor__resizeblock-tooltip-active');
        const size = ui.size.height <= 0 ? 0 : `${ui.size.height}px`;
        onChange(direction, size);
      },
      resize: (event, ui) => {
        setTimeout(() => {
          // node.current.parentNode.style.paddingBottom = `${ui.size.height > 0 ? ui.size.height : 0}px`;
          tooltipNode.current.innerHTML = `${ui.size.height > 0 ? ui.size.height : 0}px`;
        }, 5);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (directionTop) {
    return (
      <div ref={node} className="editor__resizeblock-top" style={{ height: value === 0 ? 5 : value }}>
        <div
          ref={tooltipNode}
          className="editor__resizeblock-tooltip editor__resizeblock-tooltip-top"
        />
      </div>
    );
  }

  if (directionBottom) {
    return (
      <div ref={node} className="editor__resizeblock-bottom" style={{ height: value === 0 ? 5 : value }}>
        <div
          ref={tooltipNode}
          className="editor__resizeblock-tooltip editor__resizeblock-tooltip-bottom"
        />
      </div>
    );
  }

  return null;
};

ResizeBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  onChange: PropTypes.func,
};

export default ResizeBlock;
