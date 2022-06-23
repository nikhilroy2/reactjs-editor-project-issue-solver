import React from 'react';
import PropTypes from 'prop-types';
import './_button-align-justify.scss';
import { ReactComponent as ALIGN_JUSTIFY } from '../../../../assets/img/wysiwyg/align_justify.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Текст justify
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const AlignJustify = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <ALIGN_JUSTIFY />
  </ButtonWrapper>
);

AlignJustify.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default AlignJustify;
