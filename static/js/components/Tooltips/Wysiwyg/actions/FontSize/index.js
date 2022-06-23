import React from 'react';
import './_action_font_size.scss';
import PropTypes from 'prop-types';
import { ReactComponent as FONT_SIZE } from '../../../../../assets/img/wysiwyg/font_size.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Кнопка вызова компонента List для изменения размера текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const FontSize = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={onClick} active={activeButton}>
      <Tooltip text="Font size" offset={8}>
        <FONT_SIZE />
      </Tooltip>
    </Item>
  );
};

FontSize.propTypes = {
  /**
   * Перход к списку List по клику
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Размер у выделенного текста в EditState
   */
  value: PropTypes.string,
};

FontSize.defaultProps = {

};

export default FontSize;
