import React from 'react';
import PropTypes from 'prop-types';
import { Item, ItemClose } from '../../Layouts';
import { list } from './contants';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Заголовки H1,H2,H3,H4,H5,H6 и P
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const HeadersList = ({ value, onChange, onClose }) => (
  <>
    {list.map((item, index) => (
      <Item
        key={`action-header-list-${index}`}
        active={item.value === value || (item.value === 'p' && value === undefined)}
        onClick={() => onChange(item.value)}
      >
        <Tooltip
          text={
                item.value === 'p' ? 'Paragraph' : item.value[0].toUpperCase() + item.value.substr(1).replace(/-/g, ' ')
              }
          offset={8}
        >
          {item.icon}
        </Tooltip>
      </Item>
    ))}
    <Tooltip text="Back" offset={8}>
      <ItemClose onClick={onClose} />
    </Tooltip>
  </>
);

HeadersList.propTypes = {
  /**
   * Возвращаем новое значение Headers
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
};

HeadersList.defaultProps = {};

export default HeadersList;
