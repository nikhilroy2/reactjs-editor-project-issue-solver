import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './_button-color.scss';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Цвет выделенного текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Color = forwardRef((props, ref) => {
  const { value } = props;

  return (
    <ButtonWrapper {...props}>
      <div className="editor__toolbar-buttons-color" ref={ref}>
        <div
          className="editor__toolbar-buttons-color-preview"
          style={{ background: value || 'transparent' }}
        />
      </div>
    </ButtonWrapper>
  );
});

Color.propTypes = {
  value: PropTypes.object,
};

export default Color;
