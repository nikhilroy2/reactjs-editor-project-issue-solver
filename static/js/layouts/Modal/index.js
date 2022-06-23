import './_modal.scss';
import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as IconPrev } from '../../assets/img/arrow-prev.svg';
import { ReactComponent as IconClose } from '../../assets/img/close.svg';
import Tooltip from '../../components/Elements/Tooltip';

export const Modal = forwardRef((props, ref) => {
  const { children, width } = props;

  useEffect(() => {
    const body = document && document.body ? document && document.body : false;
    if (body) {
      body.classList.add('editor__modal-no-scroll');
    }

    return () => {
      body.classList.remove('editor__modal-no-scroll');
    };
  }, []);

  return (
    <div className="editor__modal animated fadeIn faster">
      <div className="editor__modal-dialog">
        <div
          style={{ maxWidth: `${width}px` }}
          className="editor__modal-content animated slideInDown faster"
          ref={ref}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

Modal.defaultProps = {
  width: 920,
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  width: PropTypes.number,
};

export const ModalHeader = ({ children, onClose }) => (
  <div className="editor__modal-header">
    {children}
    <Tooltip text="Close">
      <IconClose
        className="editor__modal-header_close-icon animated fadeIn faster"
        onClick={() => onClose()}
      />
    </Tooltip>
  </div>
);

ModalHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  onClose: PropTypes.func,
};

export const ModalBody = ({ children }) => <div className="editor__modal-body">{children}</div>;

ModalBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const ModalHeaderArrowBack = ({ ...props }) => (
  <div className="editor__modal-header-back animated fadeIn faster" {...props}>
    <Tooltip text="Back">
      <IconPrev />
    </Tooltip>
  </div>
);
