import React, { useEffect, useState, useRef } from 'react';
import './_settings-page.scss';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import Alert from '../../Elements/Alert';
import SettingBody from './Component';
import Loader from './Component/loader';
import {
  pagesDeletePage, pagesUpdatePage, pagesAddPage, pagesAddBlogPage, pagesDeleteBlogPage,
} from '../../../redux/actions/Pages';
import { getUrlId } from '../../Sidebars/Sublist/Pages/components/helper';
import getPosition from '../../../utils/getPosition';
import usePortal from '../../../utils/usePortal';
import { checkEmptyUrl } from './helper';

const SettingsPage = ({
  isFetching,
  rootNode,
  pageType,
  onClose,
  isEdit,
  activePageId,
  values,
  setValues,
  canEditName,
  canDelete,
  canEditVisibility,
  canEditUrl,
  inputNode,
  errorResponseText,
  error,
}) => {
  const urlId = getUrlId(window.location.pathname);
  const node = useRef(null);
  const spanRef = useRef(null);
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.data);
  const languagesMode = useSelector((state) => state.languages.mode);

  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const target = usePortal();
  const [position, setPosition] = useState(false);

  const [inputPadding, setInputPadding] = useState(false);

  const outSideClick = (e) => {
    const addBtnNode = document.querySelectorAll('.editor__sidebar-pages__collapse-body_add-btn');
    const editBtnNode = document.querySelector('.editor__sidebar_edit-btn.active');

    if (node.current && node.current.contains(e.target)) {
      return false;
    }

    if (
      !isEdit
      && ((addBtnNode[0] && addBtnNode[0].contains(e.target)) || (addBtnNode[1] && addBtnNode[1].contains(e.target)))
    ) {
      return false;
    }

    if (isEdit && editBtnNode && editBtnNode.contains(e.target)) {
      return false;
    }

    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    !isEdit && inputNode.current && inputNode.current.focus();
    const position = getPosition(rootNode, node, {
      direction: 'center center',
      margin: 80,
    });
    setInputPadding(spanRef.current.offsetWidth);
    position.width = 400;
    setPosition(position);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeletePage = () => {
    if (pageType === 'blog') {
      dispatch(pagesDeleteBlogPage(activePageId, urlId));
    } else {
      dispatch(pagesDeletePage(activePageId, urlId));
    }
    onClose(false);
  };

  const onSubmitPage = () => {
    const activePage = pages.find((page) => page.id === activePageId);

    switch (isEdit) {
      case true:
        if (
          activePage.name !== values.name
          || activePage.url !== values.url
          || activePage.seo_description !== values.seo_description
          || activePage.seo_keywords !== values.seo_keywords
          || activePage.seo_title !== values.seo_title
          || activePage.visibility !== values.visibility
        ) {
          const checkedUrlValues = checkEmptyUrl(values);
          checkedUrlValues.visibility = activePage.can_edit_visibility ? checkedUrlValues.visibility : null;
          dispatch(pagesUpdatePage(checkedUrlValues, activePageId, onClose));
        } else {
          onClose(false);
        }

        break;
      case false:
        if (pageType === 'blog') {
          values.redirect = true;
          dispatch(pagesAddBlogPage(values, onClose));
        } else {
          dispatch(pagesAddPage(values, onClose));
        }
        break;

      default:
        break;
    }
  };

  const onChangeFormatUrl = (value) => {
    const translitValue = cyrillicToTranslit().transform(value, '-');
    const formatedVal = translitValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/gi, '')
    setValues({ ...values, name: value, url: isEdit ? values.url : formatedVal });
  }

  return createPortal(
    <Popover ref={node} position={position}>
      {isFetching && (
        <div className="popover-loader">
          <Loader />
        </div>
      )}
      <PopoverHeader>PAGE SETTINGS</PopoverHeader>
      <PopoverBody>
        {error && <Alert content={errorResponseText} type="danger" />}
        <SettingBody
          spanRef={spanRef}
          pageType={pageType}
          inputNode={inputNode}
          onChangeFormatUrl={onChangeFormatUrl}
          onSubmitPage={onSubmitPage}
          values={values}
          setValues={setValues}
          inputPadding={inputPadding}
          toggleCollapse={toggleCollapse}
          isOpen={isOpen}
          isEdit={isEdit}
          canDelete={canDelete}
          canEditUrl={canEditUrl}
          canEditName={canEditName}
          confirmDelete={confirmDelete}
          canEditVisibility={canEditVisibility}
          setConfirmDelete={setConfirmDelete}
          onDeletePage={onDeletePage}
          languagesMode={languagesMode}
        />
      </PopoverBody>
    </Popover>,
    target,
  );
};

SettingsPage.propTypes = {
  isFetching: PropTypes.bool,
  rootNode: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
  onClose: PropTypes.func,
  isEdit: PropTypes.bool,
  pageType: PropTypes.string,
  activePageId: PropTypes.number,
  values: PropTypes.object,
  setValues: PropTypes.func,
  canDelete: PropTypes.bool,
  canEditName: PropTypes.bool,
  inputNode: PropTypes.object,
  errorResponseText: PropTypes.string,
  error: PropTypes.bool,
};

export default SettingsPage;
