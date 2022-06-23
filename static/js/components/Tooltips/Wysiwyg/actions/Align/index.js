import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ALIGN } from '../../../../../assets/img/wysiwyg/alight_center.svg';
import { Item } from '../../Layouts';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Направление текста "text-align"
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Align = ({ onClick }) => (
  <Item onClick={onClick}>
    <Tooltip text="Align" offset={8}>
      <ALIGN />
    </Tooltip>
  </Item>
);

Align.propTypes = {
  /**
   * Перход к списку AlignList по клику
   */
  onClick: PropTypes.func.isRequired,
};

Align.defaultProps = {

};

export default Align;
