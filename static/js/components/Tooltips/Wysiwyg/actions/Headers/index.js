import React from 'react';
import './_action_headers.scss';
import PropTypes from 'prop-types';
import { ReactComponent as PARAGRAPH } from '../../../../../assets/img/wysiwyg/paragraph.svg';
import { Item } from '../../Layouts';
import { findValue } from './helper';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Заголовки H1,H2,H3,H4,H5,H6 и P
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Headers = ({ onClick, value }) => {
  const icon = findValue(value);

  return (
    <Item onClick={onClick}>
      <Tooltip text="Headers" offset={8}>
        {value ? icon.icon : <PARAGRAPH />}
      </Tooltip>
    </Item>
  );
};

Headers.propTypes = {
  /**
   * Переход к списку заголовков List
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Цвет выделенного текста
   */
  value: PropTypes.string,
};

Headers.defaultProps = {};

export default Headers;
