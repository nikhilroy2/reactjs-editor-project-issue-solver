import React from 'react';
import PropTypes from 'prop-types';
import './_button-font-size.scss';
import { ReactComponent as FONTSIZE } from '../../../../assets/img/wysiwyg/font_size.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Размер текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const FontSize = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <FONTSIZE />
  </ButtonWrapper>
);

FontSize.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default FontSize;
