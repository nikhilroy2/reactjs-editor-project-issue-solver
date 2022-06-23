import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import { Toolbar } from '../../../../../../../layouts/Toobar';
import { tooltip } from '../../../../../../../utils/getOffsets';
import FloatLeft from './FloatLeft';
import FloatRight from './FloatRight';
import FloatCenter from './FloatCenter';
import FloatJustify from './FloatJustify';

const getToolbarCoords = (toolBarBounds, selectRangeBounds) => {
  const offsets = tooltip(toolBarBounds, selectRangeBounds);
  return {
    position: 'absolute',
    ...offsets,
  };
};

export const ImageToolbar = ({ atomicBounds, onClose, ...props }) => {
  const { Portal } = usePortal();
  const toolbarNode = useRef(null);

  const [toolbarSettings, setToolbarSettings] = useState({
    init: false,
    toolBarBounds: false,
    atomicBounds: false,
  });

  const [position, setPosition] = useState({});

  const outSideClick = (e) => {
    if (toolbarNode.current && toolbarNode.current.contains(e.target)) {
      return false;
    }

    return onClose();
  };

  useEffect(() => {
    if (toolbarSettings.toolBarBounds) {
      const coords = getToolbarCoords(toolbarNode.current.getBoundingClientRect(), atomicBounds);
      setPosition(coords);
      setToolbarSettings((prevState) => ({
        ...prevState,
        init: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    toolbarSettings.toolBarBounds.width,
    toolbarSettings.atomicBounds.width,
    atomicBounds.width,
    atomicBounds.height,
    atomicBounds.left,
  ]);

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);

    setToolbarSettings({
      init: true,
      toolBarBounds: toolbarNode.current.getBoundingClientRect(),
      atomicBounds,
    });
    return () => {
      document.removeEventListener('mousedown', outSideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal>
      <Toolbar.ToolbarWrapper
        style={{
          display: 'inline-block',
          visibility: toolbarSettings.init ? 'visible' : 'hidden',
          ...position,
        }}
        ref={toolbarNode}
      >
        <Toolbar.ToolbarBody>
          <FloatJustify {...props} />
          <FloatLeft {...props} />
          <FloatCenter {...props} />
          <FloatRight {...props} />
        </Toolbar.ToolbarBody>
      </Toolbar.ToolbarWrapper>
    </Portal>
  );
};

ImageToolbar.propTypes = {
  atomicBounds: PropTypes.object,
  onClose: PropTypes.func,
};

export default ImageToolbar;
