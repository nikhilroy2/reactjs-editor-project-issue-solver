import React from 'react';
import './_action_strikethrough.scss';
import PropTypes from 'prop-types';
import { ReactComponent as STRIKETHROUGH } from '../../../../../assets/img/wysiwyg/crossed.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Зачеркнутый текст (Strikethrough)
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Strikethrough = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={() => onClick('STRIKETHROUGH')} active={activeButton}>
      <Tooltip text="Strikethrough" offset={8}>
        <STRIKETHROUGH />
      </Tooltip>
    </Item>
  );
};

Strikethrough.propTypes = {
  /**
   * Отдаем ключ для EditorState (DraftJS)
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Есть ли в выеделенном тексте (Editor state) ключ "STRIKETHROUGH"
   */
  value: PropTypes.bool,
};

Strikethrough.defaultProps = {};

export default Strikethrough;
