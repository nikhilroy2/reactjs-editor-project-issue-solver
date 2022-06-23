/* eslint import/no-unresolved: off */
import React, { useEffect, useState, useRef } from 'react';
import './_translations.scss';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';
import usePortal from '../../../utils/usePortal';
import { Popover, PopoverHeader } from '../../../layouts/Popover';
import getPosition from '../../../utils/getPosition';
import Button from '../../Elements/Button';
import Input from '../../Elements/Input';
import {
  languagesSaveTranslations,
  languagesPopupCloseTranslationsList,
  languagesResetTranslations,
  languagesMakeDefault,
  languagesDelete,
} from '../../../redux/actions/Languages';
import TranslationsLoader from './Loader';
import TranslateInput from './TranslateInput';
import TranslationsEmpty from './Empty';

import {
  ConfirmModal, ConfirmModalActions, ConfirmModalDescription, ConfirmModalTitle,
} from '../../../layouts/ConfirmPopups';
import { getGroups, convertTranslationForm } from './helper';
import { ReactComponent as Delete } from '../../../assets/img/delete-copy2.svg';

const Translations = ({ rootNode, refNode }) => {
  const dispatch = useDispatch();
  const node = useRef(null);
  const mainNode = refNode || node;
  const { popupTranslations } = useSelector((state) => state.languages);
  const { code, can_delete } = popupTranslations;
  const searchNode = useRef(null);

  const [confirmPopup, setConfirmPopup] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const target = usePortal();
  const [position, setPosition] = useState(false);

  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    scroll: {
      badge: 1,
      toIndex: null,
      data: [],
    },
  });

  const onKeyUpEnter = (e) => {
    if (e && e.keyCode && e.keyCode === 13) {
      const {
        search,
        scroll: { badge, data },
      } = filters;
      if (search && data.length) {
        const nextScrollToIndex = data[badge - 1] && data[badge] ? data[badge].index : data[0].index;
        const nextBadge = data[badge - 1] && data[badge] ? badge + 1 : 1;

        setFilters((prevState) => ({
          ...prevState,
          scroll: {
            ...prevState.scroll,
            badge: nextBadge,
            toIndex: nextScrollToIndex,
          },
        }));
      }
    }
  };

  useEffect(() => {
    setData({
      language: {},
      forms: popupTranslations.translations,
      groups: getGroups(popupTranslations.translations),
      translations: convertTranslationForm(popupTranslations.translations),
    });
  }, [popupTranslations]);

  // eslint-disable-next-line consistent-return
  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (data.notSaved) {
      return setConfirmPopup('SAVE');
    }
    document.addEventListener('mousedown', outSideClick, false);
    dispatch(languagesPopupCloseTranslationsList());
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  useEffect(() => {
    const position = getPosition(rootNode, mainNode, {
      direction: 'right',
      margin: 2,
    });
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveConfirmPopup = () => {
    setConfirmPopup(null);
  };

  const onChangeTranslate = (key, value) => {
    setData((prevState) => ({
      ...prevState,
      notSaved: true,
      translations: {
        ...prevState.translations,
        [key]: value,
      },
    }));
  };

  const onScrollToSection = (value) => {
    setFilters((prevState) => ({
      ...prevState,
      scroll: {
        ...prevState.scroll,
        toIndex: value,
      },
    }));
  };

  const onChangeSearchValue = (e) => {
    const value = e.target.value;
    const items = [];
    popupTranslations.translations.forEach(({ key }, index) => {
      if (key.indexOf(value) !== -1) {
        items.push({
          key,
          index,
        });
      }
    });
    setFilters((prevState) => ({
      ...prevState,
      search: value,
      scroll: {
        ...prevState.scrollToIndex,
        badge: 1,
        toIndex: items.length ? items[0].index : null,
        data: items,
      },
    }));
  };

  const onSaveChanges = () => {
    const { translations } = data;
    setData((prevState) => ({
      ...prevState,
      notSaved: false,
    }));
    if (confirmPopup) {
      onRemoveConfirmPopup();
    }
    dispatch(languagesSaveTranslations(code, translations));
  };

  const onResetTranslations = () => {
    setConfirmPopup(null);
    dispatch(languagesResetTranslations(code));
  };

  const onMakeDefault = () => {
    dispatch(languagesMakeDefault(code));
  };

  const onDeleteLanguage = () => {
    dispatch(languagesDelete(code));
  };

  return createPortal(
    <Popover width={740} ref={mainNode} position={position} className="editor-translations">
      {data ? (
        <>
          {popupTranslations.isLoading ? <TranslationsLoader /> : null}
          <PopoverHeader>
            <div className="editor-translations__header">
              <div className="editor-translations__header-left">
                <div className="editor-translations__header-title">{popupTranslations.name}</div>
                {popupTranslations.default ? (
                  <div className="editor-translations__header-badge">Default</div>
                ) : (
                  <div className="editor-translations__header-actions">
                    <Button size="xs" style={{ textTransform: 'none' }} onClick={onMakeDefault}>
                      Make default
                    </Button>
                  </div>
                )}
              </div>
              <div className="editor-translations__header-right">
                <div className="editor-translations__header-search">
                  <Input
                    height={32}
                    newRef={searchNode}
                    placeholder="Search translation…"
                    onKeyUp={onKeyUpEnter}
                    value={filters.search}
                    onChange={onChangeSearchValue}
                  />
                  {filters.search ? (
                    <span className="editor-translations__header-search-badge">
                      {filters.scroll.data.length > 0 ? `${filters.scroll.badge}/${filters.scroll.data.length}` : '0'}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </PopoverHeader>
          <div className="editor-translations__body scrollbar-light">
            <div className="editor-translations__body-left">
              <div className="editor-translations__body-list">
                {data.groups.map((group) => (
                  <div className="editor-translations__body-list-item" key={group.name} onClick={() => onScrollToSection(group.index)}>
                    {group.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="editor-translations__body-right">
              <VirtualList
                width="100%"
                height={530}
                className="editor-translations__body-forms"
                scrollToIndex={filters.scroll.toIndex}
                itemCount={Object.keys(data.translations).length}
                itemSize={76}
                onScroll={() => onScrollToSection(null)}
                renderItem={({ index, style }) => {
                  const name = Object.keys(data.translations)[index];
                  const value = data.translations[name];

                  return (
                    <div key={index} style={style}>
                      <TranslateInput
                        search={filters.search}
                        name={name}
                        value={value}
                        onChangeTranslate={(value) => onChangeTranslate(name, value)}
                      />
                    </div>
                  );
                }}
              />
              <div className="editor-translations__body-actions">
                {can_delete ? (
                  <div className="form-group__actions-wrapper mr-auto">
                    {!confirmDelete ? (
                      <button onClick={() => setConfirmDelete(true)} className="delete-page__btn">
                        <Delete />
                        Delete language
                      </button>
                    ) : null}
                    {confirmDelete ? (
                      <div className="confirm-delete">
                        <Delete />
                        <div>Are you sure?</div>
                        <button onClick={() => onDeleteLanguage()} className="delete-page__btn delete-page__btn-yes">
                          Yes, delete
                        </button>
                        <button onClick={() => setConfirmDelete(false)} className="delete-page__btn delete-page__btn-no">
                          No
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {!confirmDelete ? (
                  <>
                    <span className="editor-translations__body-reset" onClick={() => setConfirmPopup('RESET')}>
                      Reset
                    </span>
                    <Button onClick={onSaveChanges}>Save changes</Button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {confirmPopup === 'RESET' ? (
            <>
              <ConfirmModal>
                <ConfirmModalTitle>Reset translation</ConfirmModalTitle>
                <ConfirmModalDescription>Discard all changes and reset to a default language translation?</ConfirmModalDescription>
                <ConfirmModalActions
                  onClickCancel={onRemoveConfirmPopup}
                  onClickConfirm={onResetTranslations}
                  confirmLabel="Yes, reset"
                  cancelLabel="Cancel"
                />
              </ConfirmModal>
            </>
          ) : null}
          {confirmPopup === 'SAVE' ? (
            <>
              <ConfirmModal>
                <ConfirmModalTitle>Unsaved changes</ConfirmModalTitle>
                <ConfirmModalDescription>You have unsaved changes that will be lost if you will close the window.</ConfirmModalDescription>
                <ConfirmModalActions
                  onClickCancel={onRemoveConfirmPopup}
                  onClickConfirm={onSaveChanges}
                  confirmLabel="Continue"
                  cancelLabel="Cancel"
                />
              </ConfirmModal>
            </>
          ) : null}
        </>
      ) : (
        <TranslationsEmpty name={popupTranslations.name} />
      )}
    </Popover>,
    target,
  );
};

Translations.defaultProps = {};

Translations.propTypes = {};

export default Translations;
