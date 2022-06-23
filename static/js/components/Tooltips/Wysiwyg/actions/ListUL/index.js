import React from 'react';
import './_action_list_ul.scss';
import PropTypes from 'prop-types';
import { ReactComponent as UL } from '../../../../../assets/img/wysiwyg/ul_list.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Список ul
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ListUL = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={() => onClick('unordered-list-item')} active={activeButton}>
      <Tooltip text="Unordered list" offset={8}>
        <UL />
      </Tooltip>
    </Item>
  );
};

ListUL.propTypes = {
  /**
   * Возвращаем ключ "unordered-list-item" ul списка для EditorState (DraftJS)
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Если ли список в выделенном текста
   */
  value: PropTypes.bool,
};

ListUL.defaultProps = {

};

export default ListUL;
