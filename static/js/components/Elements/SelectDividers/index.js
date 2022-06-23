import React, { useEffect, useState, useRef } from 'react';
import './_select_dividers.scss';

import InlineSVG from 'svg-inline-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { findSelectedDivider } from '../../../utils/dividers';
import { createBase64Divider, getSvgString } from '../../../utils/svg'
import DividerNone from './EmptySelect';

/**
 * Селект дивайдеров
 *
 * @component
 * @example
 * const list = [''];
 * const value = '<svg></svg>';
 * const direction = 'top';
 * const onChangeDivider = () => { return '<svg></svg>'}
 * return (
 *   <SelectDividers list={list} value={value} direction={direction} onChangeDivider={onChangeDivider} />
 * )
 */
const SelectDividers = ({
  list, value, onChangeDivider, direction,
}) => {
  const [isOpenList, setOpenList] = useState(false);
  const nodeList = useRef(null);

  const outSideClick = (e) => {
    if (nodeList.current && nodeList.current.contains(e.target)) {
      return false;
    }
    return setOpenList(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false)
    }
  }, [isOpenList]);

  const onSelectDivider = (divider, id) => {
    if (Number(value) !== Number(id)) {
      onChangeDivider(divider, id);
    }
    setOpenList(false);
  };

  const onClick = () => {
    setOpenList(true);
  };

  const selectedDivider = findSelectedDivider(list, value);

  return (
    <div className="editor__elements-select_dividers scrollbar-light">
      <div className="editor__elements-select_dividers-wrap" onClick={() => onClick()}>
        {selectedDivider ? <div className="editor__elements-select_dividers-selected" style={{ backgroundImage: createBase64Divider('#e9ecf1', selectedDivider.source[direction]) }} /> : <div className="editor__elements-select_dividers-no-selected">None</div>}
      </div>
      {isOpenList
        ? (
          <div
            className="editor__elements-select_dividers-list animated zoomInFaster faster-3"
            ref={nodeList}
          >
            {list.length && list.map((item, index) => (
              <div
                className={classNames('editor__elements-select_dividers-list-item', {
                  'editor__elements-select_dividers-list-item-active': Number(item.id) === Number(value),
                })}
                key={`dividers_list_${index}`}
                onClick={() => onSelectDivider(item.source, item.id)}
              >
                {item.source
                  ? (
                    <div className="editor__elements-select_dividers-list-item-divider">
                      <InlineSVG src={getSvgString(item.source[direction], '#e9ecf1')} />
                    </div>
                  )
                  : <DividerNone />}
              </div>
            ))}
          </div>
        ) : null}
    </div>
  )
};

SelectDividers.defaultProps = {
  direction: 'top',
};

SelectDividers.propTypes = {
  /**
   * Список дивайдеров
   */
  list: PropTypes.array.isRequired,
  /**
   * ID выбранного дивайдера
   */
  value: PropTypes.number.isRequired,
  /**
   * Функция для смены дивайдера
   */
  onChangeDivider: PropTypes.func.isRequired,
  /**
   * Позиция дивайдера: top || bottom
   */
  direction: PropTypes.string,
};

export default SelectDividers;
