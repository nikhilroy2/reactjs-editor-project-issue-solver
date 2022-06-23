import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import './_icons-select.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Switch from '../Switch';
import List from './List';
import { getIconName } from './_helper';

const IconSelect = ({
  visibility, value, onChange, onChangeVisibility,
}) => {
  const [isOpenIconList, setOpenIconList] = useState(false);
  const nodeList = useRef(null);
  const nodePreview = useRef(null);
  const iconName = getIconName(value);

  const outSideClick = useCallback((e) => {
    if (nodeList.current && nodeList.current.contains(e.target)) {
      return false;
    }
    if (nodePreview.current && nodePreview.current.contains(e.target)) {
      return false;
    }
    document.removeEventListener('mousedown', outSideClick, false);
    return setOpenIconList(false);
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false)
    }
  }, [isOpenIconList, outSideClick]);

  const onOpenList = () => {
    if (isOpenIconList) {
      document.removeEventListener('mousedown', outSideClick, false);
      setOpenIconList(false)
    } else {
      setOpenIconList(true)
    }
  };

  return (
    <>
      <div className="editor__elements-select-icons">
        <div className="editor__elements-select-icons-left">
          <div
            className={classNames('editor__elements-select-icons-preview', {
              'editor__elements-select-icons-preview-disabled': !visibility,
            })}
            onClick={onOpenList}
            ref={nodePreview}
          >
            <span className={value} />
          </div>
          <div className="editor__elements-select-icons-block">
            <div className="editor__elements-select-icons-title">
              Icon
            </div>
            <div className="editor__elements-select-icons-description">
              {iconName}
            </div>
          </div>
          {isOpenIconList
            ? (
              <List
                nodeList={nodeList}
                value={value}
                onChange={onChange}
              />
            )
            : null}
        </div>
        <div className="editor__elements-select-icons-right">
          <Switch
            value={visibility}
            onChange={onChangeVisibility}
          />
        </div>
      </div>
    </>
  );
}

IconSelect.defaultProps = {
  value: 'fad fa-image-polaroid',
  visibility: true,
};

IconSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  visibility: PropTypes.bool,
  onChangeVisibility: PropTypes.func,
};

export default IconSelect;
