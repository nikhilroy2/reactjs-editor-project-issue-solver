import React from 'react';
import PropTypes from 'prop-types';
import './_line-height.scss';
import { ReactComponent as LINE_HEIGHT } from '../../../../assets/img/wysiwyg/lineheight.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Отступ по высоте
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const LineHeight = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <LINE_HEIGHT />
  </ButtonWrapper>
);

LineHeight.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default LineHeight;
