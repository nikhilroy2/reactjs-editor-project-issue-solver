import React from 'react';
import PropTypes from 'prop-types';
import './_button-align-right.scss';
import { ReactComponent as ALIGN_RIGHT } from '../../../../assets/img/wysiwyg/alight_right.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Текст справа
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const AlignRight = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <ALIGN_RIGHT />
  </ButtonWrapper>
);

AlignRight.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default AlignRight;
