import React from 'react';
import './_action_letter_spacing.scss';
import PropTypes from 'prop-types';
import { ItemClose } from '../../Layouts';
import RangeSlideTooltip from '../../../../Elements/RangeSliderTooltip';

/**
 * Отступ letter-spacing
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const LetterSpacingList = ({ onChange, onClose }) => (
  <div className="wysiwyg-actions__item-letter_spacing">
    <div className="wysiwyg-actions__item-letter_spacing-slider">
      <RangeSlideTooltip min={0.1} max={10} step={0.1} onChange={(value) => onChange('letterSpacing', value)} input />
    </div>
    <div className="wysiwyg-actions__item-letter_spacing-close">
      <ItemClose onClick={onClose} />
    </div>
  </div>
);

LetterSpacingList.propTypes = {
  /**
   * Передаем новое значение letter-spacing
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Закрыть текущий список
   */
  onClose: PropTypes.func.isRequired,
};

LetterSpacingList.defaultProps = {

};

export default LetterSpacingList;
