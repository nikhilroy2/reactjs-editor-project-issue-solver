import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './_button-link.scss';
import { ReactComponent as LINK } from '../../../../assets/img/wysiwyg/link.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Ссылка
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Link = forwardRef((props, ref) => {
  const { active } = props;
  return (
    <ButtonWrapper {...props} active={active}>
      <LINK ref={ref} />
    </ButtonWrapper>
  );
});

Link.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Link;
