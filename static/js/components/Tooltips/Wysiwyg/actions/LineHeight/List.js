import React from 'react';
import './_action_line_height.scss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ItemClose } from '../../Layouts';
import RangeSlideTooltip from '../../../../Elements/RangeSliderTooltip';
import { getDefaultSize } from '../FontSize/helpers';

/**
 * Параметр line-height
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const LineHeightList = ({
  onChange, value, headers, onClose,
}) => {
  const activeValue = value ? parseInt(value, 10) : false;
  const components = useSelector((state) => state.components.data);
  const defaultSize = getDefaultSize(headers, components.headers, 'line_height');
  return (
    <div className="wysiwyg-actions__item-line_height">
      <div className="wysiwyg-actions__item-line_height-slider">
        <RangeSlideTooltip min={12} max={150} step={1} value={activeValue || defaultSize} onChange={(value) => onChange('lineHeight', value)} input />
      </div>
      <div className="wysiwyg-actions__item-line_height-close">
        <ItemClose onClick={onClose} />
      </div>
    </div>
  )
};

LineHeightList.propTypes = {
  /**
   * Возвращаем новое значение line-height
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

LineHeightList.defaultProps = {

};

export default LineHeightList;
