import React from 'react';
import PropTypes from 'prop-types';
import './_letter-spacing.scss';
import { ReactComponent as LETTER_SPACING } from '../../../../assets/img/wysiwyg/letter_spasing.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Отступ по высоте
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const LetterSpacing = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <LETTER_SPACING />
  </ButtonWrapper>
);

LetterSpacing.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default LetterSpacing;
