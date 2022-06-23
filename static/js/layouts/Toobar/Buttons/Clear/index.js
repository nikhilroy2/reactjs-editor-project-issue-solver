import React from 'react';
import PropTypes from 'prop-types';
import './_button-clear.scss';
import { ReactComponent as CLEAR } from '../../../../assets/img/wysiwyg/clear-wysiwyg.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Очистить стили
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Clear = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <CLEAR />
  </ButtonWrapper>
);

Clear.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Clear;
