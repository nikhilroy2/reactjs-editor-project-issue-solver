import './scss/_pages.scss';
import React, {
  useEffect, useRef, useState, memo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Sidebar, SidebarBody } from '../../../../layouts/Sidebar';

import Collapse from '../../../../layouts/Collapse';
import PageField from './components/page';
import SettingsPage from '../../../Popups/SettingsPage';
import { ReactComponent as Plus } from '../../../../assets/img/back-copy-6.svg';

import { mapPagesSelector } from '../../../../redux/selectors/pages';
import {
  filterEmptyPage,
  switchPageMode,
  clearErrorState,
  addEmptyPage,
} from '../../../../redux/actions/Pages';
import { getButtonAddName, getPageType } from './helper';

const defaultPageData = {
  name: '',
  url: '',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  is_public: 0,
  visibility: true,
};

const SidebarPages = ({ onClose }) => {
  const dispatch = useDispatch();
  const node = useRef(null);
  const inputNode = useRef(null);
  const pages = useSelector((state) => mapPagesSelector(state));
  const {
    isFetching,
    titles,
    pagesPublic,
    pagesInternal,
    pagesBlog,
    isEdit,
    activeIdPage,
    error,
    errorResponseText,
  } = pages;
  const mapPages = { pagesPublic, pagesInternal, pagesBlog };

  const [isOpen, setOpen] = useState(titles.map(() => true));

  const [isPageSettings, setOpenPageSettings] = useState({
    open: false,
    canEditName: true,
    canDelete: false,
    canEditUrl: true,
    canEditVisibility: true,
    pageType: 'public',
  });
  const [pageValues, setPageValues] = useState({});

  const outSideClick = (e) => {
    const menuNode = document.getElementById('editor__sidebar-menu-item-pages');
    if (menuNode && menuNode.contains(e.target)) {
      return false;
    }
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (isPageSettings.open) {
      return false;
    }

    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  const onClick = (index) => () => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setOpen(newIsOpen);
  };

  const addClick = (page) => {
    inputNode.current && inputNode.current.focus();

    const pageType = getPageType(page);
    dispatch(switchPageMode({ isEdit: false, activeIdPage: null }));
    !isPageSettings.open && !isEdit && dispatch(addEmptyPage(pageType));

    setPageValues({ ...defaultPageData, is_public: pageType === 'public' || pageType === 'blog' ? 1 : 0 });
    setOpenPageSettings((prev) => ({
      ...prev,
      open: true,
      canEditName: true,
      canDelete: false,
      canEditVisibility: true,
      pageType,
    }));
  };

  const onCloseSettings = () => {
    dispatch(clearErrorState());
    dispatch(filterEmptyPage());
    dispatch(switchPageMode({ isEdit: false, activeIdPage: null }));

    setPageValues({});
    setOpenPageSettings((prev) => ({ ...prev, open: false }));
  };

  return (
    <Sidebar ref={node}>
      <SidebarBody>
        <div className="editor__sidebar-pages scrollbar-light">
          <div className="editor__sidebar-pages-body">
            {Object.keys(mapPages).map((item, index) => {
              const buttonName = getButtonAddName(item);
              return (
                <Collapse key={index} title={titles[index]} isOpen={isOpen[index]} onClick={onClick(index)}>
                  <div className="editor__sidebar-pages__collapse-body">
                    {mapPages[item].map((newItem, newIndex) => (
                      <PageField
                        key={newIndex}
                        {...newItem}
                        canDelete={newItem.can_delete}
                        setOpenPageSettings={setOpenPageSettings}
                        activeIdPage={activeIdPage}
                        setPageValues={setPageValues}
                      />
                    ))}
                    <button
                      onClick={() => addClick(item)}
                      className="editor__sidebar-pages__collapse-body_add-btn"
                    >
                      <Plus />
                      <span>{buttonName}</span>
                    </button>
                  </div>
                </Collapse>
              )
            })}
          </div>
        </div>
      </SidebarBody>
      {isPageSettings.open ? (
        <SettingsPage
          pageType={isPageSettings.pageType}
          canEditName={isPageSettings.canEditName}
          canEditUrl={isPageSettings.canEditUrl}
          canEditVisibility={isPageSettings.canEditVisibility}
          isFetching={isFetching}
          rootNode={node}
          onClose={() => !isFetching && onCloseSettings()}
          isEdit={isEdit}
          activePageId={activeIdPage}
          canDelete={isPageSettings.canDelete}
          values={pageValues}
          setValues={setPageValues}
          inputNode={inputNode}
          error={error}
          errorResponseText={errorResponseText}
        />
      ) : null}
    </Sidebar>
  );
};

SidebarPages.propTypes = {
  onClose: PropTypes.func,
};

export default memo(SidebarPages);
