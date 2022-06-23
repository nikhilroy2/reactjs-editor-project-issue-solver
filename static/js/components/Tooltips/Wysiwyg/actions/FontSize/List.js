import React from 'react';
import './_action_font_size.scss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ItemClose } from '../../Layouts';
import RangeSlideTooltip from '../../../../Elements/RangeSliderTooltip';
import { getDefaultSize } from './helpers';

/**
 * Изменение размера текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const FontSizeList = ({
  onChange, value, headers, onClose,
}) => {
  const activeValue = value ? parseInt(value, 10) : false;
  const components = useSelector((state) => state.components.data);
  const defaultSize = getDefaultSize(headers, components.headers, 'font_size');

  return (
    <div className="wysiwyg-actions__item-font_size">
      <div className="wysiwyg-actions__item-font_size-slider">
        <RangeSlideTooltip min={8} max={150} onChange={(value) => onChange('fontSize', value)} value={activeValue || defaultSize} input />
      </div>
      <div className="wysiwyg-actions__item-font_size-close">
        <ItemClose onClick={onClose} />
      </div>
    </div>
  )
};

FontSizeList.propTypes = {
  /**
   * Возвращаем новое значение FontSize (px)
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Закрыть текущий список
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Значение размера текста
   */
  value: PropTypes.string,
  /**
   * Активное значение headers из EditorState (Draftjs)
   */
  headers: PropTypes.object,
};

FontSizeList.defaultProps = {

};

export default FontSizeList;
