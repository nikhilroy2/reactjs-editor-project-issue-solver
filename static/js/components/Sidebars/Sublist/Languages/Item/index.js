/*eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ReactComponent as Visibility
} from "../../../../../assets/img/totals_visibility.svg";
import {ReactComponent as Dots} from "../../../../../assets/img/dots.svg";
import {ReactComponent as EditTranslation} from "../../../../../assets/img/edit-translation.svg";
import { sortableHandle } from 'react-sortable-hoc';
import Tooltip from "../../../../Elements/Tooltip";
import classNames from "classnames";
import {
  languagesActivate,
  languagesPopupOpenTranslationsList,
  languagesTranslationMode
} from "../../../../../redux/actions/Languages";
import moment from 'moment';
import PopupTranslations from '../../../../Popups/Translations';

const DragHandle = sortableHandle(() => (
  <div className="editor-sidebar__languages-item-handle">
    <Dots />
  </div>
));

const LanguagesItem = ({ drag, index, ...props }) => {
  const { name, code, active, updated_at} = props;
  const defaultLanguage = props.default;
  const languages = useSelector((state) => state.languages);
  const dispatch = useDispatch();
  const node = useRef(null);

  const isActiveMode = languages.mode && languages.mode === code;
  const updatedAt = updated_at ? moment.unix(updated_at).format("YYYY-MM-DD HH:mm:ss") : 'Never modified';

  const onClickActive = (e) => {
    e.stopPropagation();
    dispatch(languagesActivate(code, !active));
  };

  const onChangeTranslation = (e) => {
    e.stopPropagation();
    dispatch(languagesPopupOpenTranslationsList(props));
  };

  const onTranslationMode = (e) => {
    if (languages.mode !== code) {
      e.preventDefault();
      e.stopPropagation();
      if (defaultLanguage) {
        if (languages.mode) {
          dispatch(languagesTranslationMode(null));
        }
      } else {
        dispatch(languagesTranslationMode(code))
      }
    }
  };

  return (
    <div className={classNames('editor-sidebar__languages-item', {
      'editor-sidebar__languages-item-disabled': !active,
      'editor-sidebar__languages-item-active': isActiveMode || !languages.mode && defaultLanguage,
    })}
         ref={node}
         key={index}
         style={{ zIndex: 9000 }}
    >
      <div className="editor-sidebar__languages-item-main"
           onClick={onTranslationMode}>
        {drag ? <DragHandle /> : null}
        <div className="editor-sidebar__languages-item-name">
          {name} {defaultLanguage ? <span className="editor-sidebar__languages-item-default">(default)</span> : null}
        </div>
      </div>
      <div className="editor-sidebar__languages-item-actions">
        {!defaultLanguage ?
          <div className="editor-sidebar__languages-item-actions-item editor-sidebar__languages-item-actions-visibility" onClick={onClickActive}>
            <Tooltip text={active ? 'Make hidden' : 'Make visible'}>
              <Visibility />
            </Tooltip>
          </div> : null
        }
        <div className="editor-sidebar__languages-item-actions-item" onClick={onChangeTranslation}>
          <Tooltip text={updatedAt}>
            <EditTranslation />
          </Tooltip>
        </div>
      </div>
      {languages.popupTranslations && languages.popupTranslations.code === code?
        <PopupTranslations
          rootNode={node}/> : null
      }
    </div>
  )
};

LanguagesItem.defaultProps = {
  drag: false,
  index: 0
};

LanguagesItem.propTypes = {
  drag: PropTypes.bool.isRequired,
  index: PropTypes.number
};

export default LanguagesItem;
