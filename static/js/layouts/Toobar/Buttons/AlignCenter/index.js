import React from 'react';
import PropTypes from 'prop-types';
import './_button-align-center.scss';
import { ReactComponent as ALIGN_CENTER } from '../../../../assets/img/wysiwyg/alight_center.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Текст по центру
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const AlignCenter = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <ALIGN_CENTER />
  </ButtonWrapper>
);

AlignCenter.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default AlignCenter;
