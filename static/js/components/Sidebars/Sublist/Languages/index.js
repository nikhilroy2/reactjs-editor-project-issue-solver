import React, { useEffect, useRef, memo } from 'react';
import './_sidebar-languages.scss'
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import { ReactComponent as Plus } from '../../../../assets/img/back-copy-6.svg';
import PopupLanguagesList from '../../../Popups/LanguagesList';
import {
  languagesPopupOpenAddLanguage,
  languagesSortable,
} from '../../../../redux/actions/Languages';
import { getLanguagesList } from './helper';
import Spinner from '../../../../layouts/Loaders/Spinner';
import { Sidebar, SidebarBody } from '../../../../layouts/Sidebar';
import LanguagesSortableContainer from './Container';
import LanguagesItem from './Item';

const SidebarLanguages = ({ onClose }) => {
  const dispatch = useDispatch();
  const node = useRef(null);
  const buttonNode = useRef(null);
  const languages = useSelector((state) => state.languages);
  const { isLoading } = languages;
  const data = getLanguagesList(languages);

  const outSideClick = (e) => {
    const menuNode = document.getElementById('editor__sidebar-menu-item-languages');
    if (menuNode && menuNode.contains(e.target)) {
      return false;
    }
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (languages.popupAddLanguage) {
      return false;
    }
    if (languages.popupTranslations) {
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

  const openAddLanguagePopup = () => {
    dispatch(languagesPopupOpenAddLanguage());
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newOldIndex = oldIndex + 1;
    const newNewIndex = newIndex + 1;

    const newData = arrayMove(languages.data, newOldIndex, newNewIndex);
    const positions = newData.map((item, index) => ({
      code: item.code,
      position: index + 1,
    }));

    dispatch(languagesSortable(newData, positions));
  };

  return (
    <Sidebar ref={node}>
      <SidebarBody>
        <div className="editor-sidebar__languages">
          {isLoading
            ? (
              <div className="editor-sidebar__languages-loader">
                <Spinner theme="dark" />
              </div>
            ) : null}
          <div className="editor-sidebar__languages-title">
            Languages
          </div>
          {data.list && data.list.length
            ? (
              <div className="editor-sidebar__languages-description">
                To enter the language translation mode, select a language from the list below
              </div>
            ) : null}
          <div className="editor-sidebar__languages-body">
            <LanguagesItem
              index={0}
              drag={false}
              {...data.default}
            />
            <LanguagesSortableContainer
              items={data.list}
              helperClass="editor-sidebar__languages-item-drag"
              useDragHandle
              onSortEnd={onSortEnd}
            />
          </div>
          <div className="editor-sidebar__languages-actions">
            <button
              className="editor-sidebar__languages-button"
              ref={buttonNode}
              onClick={openAddLanguagePopup}
            >
              <Plus />
              <span>Add new language</span>
            </button>
          </div>
          {languages.popupAddLanguage
            ? (
              <PopupLanguagesList
                rootNode={buttonNode}
              />
            ) : null}
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

SidebarLanguages.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default memo(SidebarLanguages);
