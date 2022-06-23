import React from 'react';
import './_action_letter_spacing.scss';
import PropTypes from 'prop-types';
import { ReactComponent as LETTER_SPACING } from '../../../../../assets/img/wysiwyg/letter_spasing.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Отступ letter-spacing
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const LetterSpacing = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={onClick} active={activeButton}>
      <Tooltip text="Letter spacing" offset={8}>
        <LETTER_SPACING />
      </Tooltip>
    </Item>
  );
};

LetterSpacing.propTypes = {
  /**
   * Перход к списку List по клику
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Размер у выделенного текста в EditState
   */
  value: PropTypes.string,
};

LetterSpacing.defaultProps = {};

export default LetterSpacing;
