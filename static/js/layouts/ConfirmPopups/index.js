import React from 'react';
import './_confirm-popups.scss';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../components/Elements/Button';

export const ConfirmModal = ({ children }) => (
  <div className="editor-languages__popup">
    <div className="editor-languages__popup-modal animated zoomInFaster faster-3">
      {children}
    </div>
  </div>
);

ConfirmModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const ConfirmModalTitle = ({ children }) => (
  <div className="editor-languages__popup-title">{children}</div>
)

ConfirmModalTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const ConfirmModalDescription = ({ children }) => (
  <div className="editor-languages__popup-description">{children}</div>
);

ConfirmModalDescription.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const ConfirmModalActions = ({
  cancelLabel, confirmStyle, confirmLabel, onClickCancel, onClickConfirm,
}) => (
  <div className="editor-languages__popup-actions">
    <div className="editor-languages__popup-action">
      <Button
        style={{ textTransform: 'none', letterSpacing: '0', fontSize: 14 }}
        size="sm"
        className="editor__button-default"
        onClick={onClickCancel}
      >
        {cancelLabel}
      </Button>
    </div>
    <div className="editor-languages__popup-action">
      <Button
        style={{ textTransform: 'none', letterSpacing: '0', fontSize: 14 }}
        size="sm"
        className={classNames('editor-languages__btn', {
          'editor-languages__btn-danger': confirmStyle,
        })}
        onClick={onClickConfirm}
      >
        {confirmLabel}
      </Button>
    </div>
  </div>
);

ConfirmModalActions.propTypes = {
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  confirmStyle: PropTypes.string,
  onClickCancel: PropTypes.func.isRequired,
  onClickConfirm: PropTypes.func.isRequired,
};
