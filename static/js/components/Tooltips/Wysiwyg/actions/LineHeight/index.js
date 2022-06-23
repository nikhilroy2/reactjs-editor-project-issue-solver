import React from 'react';
import './_action_line_height.scss';
import PropTypes from 'prop-types';
import { ReactComponent as LINE_HEIGHT } from '../../../../../assets/img/wysiwyg/lineheight.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Параметр line-height
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const LineHeight = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={onClick} active={activeButton}>
      <Tooltip text="Line height" offset={8}>
        <LINE_HEIGHT />
      </Tooltip>
    </Item>
  );
};

LineHeight.propTypes = {
  /**
   * Перход к списку List по клику
   */
  onClick: PropTypes.func.isRequired,
  /**
   * line-height выделенного текста в EditState
   */
  value: PropTypes.string,
};

LineHeight.defaultProps = {};

export default LineHeight;
