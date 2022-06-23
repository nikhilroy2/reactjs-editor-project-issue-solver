import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import './_popover.scss';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import classNames from 'classnames';
import { ReactComponent as IconPrev } from '../../assets/img/arrow-prev.svg';
import { AnimateHiddenDiv } from '../Animate';

import { CloseButton } from './svg';
import Tooltip from '../../components/Elements/Tooltip';

export const Popover = forwardRef((props, ref) => {
  useEffect(() => {
    $(ref.current).draggable({
      handle: '.editor__popover-handle',
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let styles = {};

  if (props.position) {
    styles = {
      ...styles,
      ...props.position,
    };
  }

  if (props.width) {
    styles = {
      ...styles,
      width: props.width,
    };
  }

  return (
    <div
      className={classNames('editor__popover animated zoomInFaster faster-3', {
        [props.className]: props.className,
      })}
      ref={ref}
      style={styles}
    >
      {props.onClose ? (
        <div className="editor__popover-close-icon" onClick={() => props.onClose(false)}>
          <Tooltip text="Close">
            <CloseButton />
          </Tooltip>
        </div>
      ) : null}
      {props.children}
    </div>
  );
});

Popover.propTypes = {
  position: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  width: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const PopoverBody = ({ children, overflow }) => (
  <div
    className={classNames('editor__popover-body', {
      'editor__popover-body-overflow': overflow,
    })}
  >
    {children}
  </div>
);

PopoverBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  overflow: PropTypes.bool,
};

export const PopoverHeader = ({ children }) => (
  <AnimateHiddenDiv>
    <div className="editor__popover-header editor__popover-handle">{children}</div>
  </AnimateHiddenDiv>
);

PopoverHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const PopoverHeaderBack = ({ ...props }) => (
  <div className="editor__popover-header-back animated fadeIn faster" {...props}>
    <Tooltip text="Back">
      <IconPrev />
    </Tooltip>
  </div>
);

export const PopoverFooter = ({ children }) => (
  <AnimateHiddenDiv>
    <div className="editor__popover-footer">{children}</div>
  </AnimateHiddenDiv>
);

PopoverFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
