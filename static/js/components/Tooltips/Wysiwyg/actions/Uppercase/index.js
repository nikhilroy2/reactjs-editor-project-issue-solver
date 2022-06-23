import React from 'react';
import './_action_uppercase.scss';
import PropTypes from 'prop-types';
import { ReactComponent as UPPERCASE } from '../../../../../assets/img/wysiwyg/uppercase.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Все буквы заглавными
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Uppercase = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={() => onClick('textTransform', 'uppercase')} active={activeButton}>
      <Tooltip text="Uppercase" offset={8}>
        <UPPERCASE />
      </Tooltip>
    </Item>
  );
};

Uppercase.propTypes = {
  /**
   * Отдаем ключ для EditorState (DraftJS)
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Есть ли в выеделенном тексте (Editor state) ключ "uppercase"
   */
  value: PropTypes.string,
};

Uppercase.defaultProps = {};

export default Uppercase;
