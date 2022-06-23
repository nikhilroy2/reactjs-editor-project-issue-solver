import React from 'react';
import './_action_list_ol.scss';
import PropTypes from 'prop-types';
import { ReactComponent as OL } from '../../../../../assets/img/wysiwyg/ol_list.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Список ol
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ListOL = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={() => onClick('ordered-list-item')} active={activeButton}>
      <Tooltip text="Ordered list" offset={8}>
        <OL />
      </Tooltip>
    </Item>
  );
};

ListOL.propTypes = {
  /**
   * Возвращаем ключ "ordered-list-item" ol списка для EditorState (DraftJS)
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Если ли список в выделенном текста
   */
  value: PropTypes.bool,
};

ListOL.defaultProps = {

};

export default ListOL;
