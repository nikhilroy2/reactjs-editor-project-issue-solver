import React, {
  useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import './_block_actions.scss';
import './_block_actions-colors.scss';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { ReactComponent as IconSettings } from '../../../assets/img/actions/settings.svg';
import { ReactComponent as IconBackground } from '../../../assets/img/actions/background-action.svg';
import { ReactComponent as IconDuplicate } from '../../../assets/img/actions/duplicate.svg';
import { ReactComponent as IconDelete } from '../../../assets/img/actions/delete.svg';
import { ReactComponent as IconDraggable } from '../../../assets/img/actions/draggable.svg';
import SettingsBackground from '../../Popups/SettingsBackground';
import SettingsBlock from '../../Popups/SettingsBlock';
import Tooltip from '../../Elements/Tooltip';
import DeleteConfirm from './DeleteConfirm';

import { dataDuplicate } from '../../../redux/actions/data/duplicate';
import { dataDelete } from '../../../redux/actions/data/delete';
import { getAccessActions } from './helper';

const BlockActions = ({
  title, settings, position, blockID, dataID, snippet,
}) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.languages);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const node = useRef(null);
  const access = getAccessActions(settings);

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
  }, [dataID]);

  const [isOpenPopupBackground, setOpenPopupBackground] = useState(false);
  const [isOpenBlockSettings, setOpenBlockSettings] = useState(false);
  const [isOpenConfirmDelete, setOpenConfirmDelete] = useState(false);

  useEffect(() => {
    if (isOpenPopupBackground || isOpenBlockSettings) {
      setIsOpenDropdown(false);
    }
  }, [isOpenPopupBackground, isOpenBlockSettings]);

  const dropdownNode = useRef(null);
  const dropdownIconNode = useRef(null);

  const outSideClickDropdown = (e) => {
    if (dropdownIconNode.current && dropdownIconNode.current.contains(e.target)) {
      return false;
    }
    if (dropdownNode.current && dropdownNode.current.contains(e.target)) {
      return false;
    }
    return setIsOpenDropdown(false);
  };

  useEffect(() => {
    if (isOpenDropdown) {
      document.addEventListener('mousedown', outSideClickDropdown, false);
    }
    return () => {
      document.removeEventListener('mousedown', outSideClickDropdown, false);
    };
  }, [isOpenDropdown]);

  const onDuplicateBlock = () => {
    const newPosition = position + 1;
    dispatch(dataDuplicate(dataID, newPosition, snippet));
  };

  const onDeleteBlock = (confirm) => {
    if (mode && !confirm) {
      setOpenConfirmDelete(true);
    } else {
      dispatch(dataDelete(dataID, snippet));
    }
  };

  const dataSets = {
    'data-id': dataID,
    'data-title': title,
  };

  return (
    <>
      <div
        className={classNames('editor__block-actions', {
          'editor__block-actions__bottom': Number(position) === 1,
          'editor__block-actions__top': Number(position) > 1,
          'editor__block-actions__center': true,
        })}
      >
        <div className="editor__block-actions-body" ref={node}>
          <div className="editor__block-actions-name">{title}</div>
          {access ? (
            <div className="editor__block-actions-list">
              <div className="editor__block-actions-icons">
                {access.structure ? (
                  <Tooltip text="Settings" offset={6}>
                    <div className="editor__block-actions-icon" onClick={() => setOpenBlockSettings(true)}>
                      <IconSettings />
                    </div>
                  </Tooltip>
                ) : null}
                {access.background ? (
                  <Tooltip text="Background" offset={6}>
                    <div className="editor__block-actions-icon" onClick={() => setOpenPopupBackground(true)}>
                      <IconBackground />
                    </div>
                  </Tooltip>
                ) : null}
                {access.sortable ? (
                  <Tooltip text="Sortable" offset={6}>
                    <div
                      className={classNames(
                        'editor__block-actions-icon editor__block-actions-icon-sortable',
                        {
                          [`editor__block-handle-sortable-${snippet}`]: snippet,
                        },
                      )}
                      {...dataSets}
                    >
                      <IconDraggable {...dataSets} />
                    </div>
                  </Tooltip>
                ) : null}
                {access.duplicate ? (
                  <Tooltip text="Duplicate" offset={6}>
                    <div className="editor__block-actions-icon" onClick={() => onDuplicateBlock()}>
                      <IconDuplicate />
                    </div>
                  </Tooltip>
                ) : null}
                {access.delete ? (
                  <Tooltip text="Delete" offset={6}>
                    <div className="editor__block-actions-icon" onClick={() => onDeleteBlock()}>
                      <IconDelete />
                    </div>
                  </Tooltip>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="editor__block-actions-list-empty" />
          )}
        </div>
      </div>

      {isOpenBlockSettings ? (
        <SettingsBlock
          parentNode={node}
          blockID={blockID}
          dataID={dataID}
          onClose={() => setOpenBlockSettings(false)}
        />
      ) : null}

      {isOpenPopupBackground ? (
        <SettingsBackground
          parentNode={node}
          blockID={blockID}
          dataID={dataID}
          onClose={() => setOpenPopupBackground(false)}
        />
      ) : null}
      {isOpenConfirmDelete
        ? (
          <DeleteConfirm
            onClose={() => setOpenConfirmDelete(false)}
            onConfirm={() => onDeleteBlock(true)}
          />
        )
        : null }
      <div className="editor__block-border editor__block-border-top" />
      <div className="editor__block-border editor__block-border-left" />
      <div className="editor__block-border editor__block-border-right" />
      <div className="editor__block-border editor__block-border-bottom" />
    </>
  );
};

BlockActions.propTypes = {
  title: PropTypes.string,
  settings: PropTypes.object,
  position: PropTypes.number,
  blockID: PropTypes.number,
  dataID: PropTypes.number,
  snippet: PropTypes.string,
};

export default BlockActions;
