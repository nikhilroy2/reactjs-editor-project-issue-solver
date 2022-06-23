/* eslint-disable */
import React, {
  useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import './_delete-confirm.scss';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import {createPortal} from 'react-dom';
import usePortal from '../../../../utils/usePortal';
import {
  ConfirmModal,
  ConfirmModalActions,
  ConfirmModalDescription,
  ConfirmModalTitle
} from '../../../../layouts/ConfirmPopups';

const DeleteConfirm = ({
  onClose, onConfirm

}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const node = useRef(null);
  const target = usePortal();
  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    return setIsOpenDropdown(false);
  };

  useEffect(() => {
    if (isOpenDropdown) {
      document.addEventListener('mousedown', outSideClick, false);
    }
    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCancel = () => {
    document.removeEventListener('mousedown', outSideClick, false);
    onClose();
  };

  return createPortal(
    <div className={'editor-delete-confirm'}>
      <ConfirmModal>
        <ConfirmModalTitle>Delete block</ConfirmModalTitle>
        <ConfirmModalDescription>Your panel has one layout for all languages, so making a change here affects all other languages too.</ConfirmModalDescription>
        <ConfirmModalActions
          onClickCancel={onClickCancel}
          onClickConfirm={onConfirm}
          confirmStyle={'danger'}
          confirmLabel={'Yes, delete'}
          cancelLabel={'Cancel'}
        />
      </ConfirmModal>
    </div>, target
  );
};

DeleteConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirm;
