import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './_button-image.scss';
import { ReactComponent as IMAGE } from '../../../../assets/img/wysiwyg/image.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Картинка
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Image = forwardRef((props, ref) => {
  const { active } = props;
  return (
    <ButtonWrapper {...props} active={active}>
      <IMAGE ref={ref} />
    </ButtonWrapper>
  );
});

Image.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Image;
