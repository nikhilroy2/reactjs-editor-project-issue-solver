import React from 'react';
import './_wysiwyg_layouts.scss';
import { ReactComponent as CLOSE } from '../../../../assets/img/close_tooltip.svg';
import Tooltip from '../../../Elements/Tooltip';

/**
 * ItemClose - Кнопка возврата
 *
 * @component
 * @category Components
 * @subcategory Tooltip layouts
 *
 */
const ItemClose = ({ ...props }) => (
  <div className="wysiwyg-actions__item-close" {...props}>
    <Tooltip text="Back" offset={10}>
      <CLOSE />
    </Tooltip>
  </div>
);

ItemClose.propTypes = {

};

ItemClose.defaultProps = {

};

export default ItemClose;
