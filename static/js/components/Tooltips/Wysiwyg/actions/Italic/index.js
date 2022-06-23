import React from 'react';
import './_action_italic.scss';
import PropTypes from 'prop-types';
import { ReactComponent as ITALIC } from '../../../../../assets/img/wysiwyg/italic.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Italic
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Italic = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={() => onClick('ITALIC')} active={activeButton}>
      <Tooltip text="Italic" offset={8}>
        <ITALIC />
      </Tooltip>
    </Item>
  );
};

Italic.propTypes = {
  /**
   * Отдаем ключ для EditorState (DraftJS)
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Есть ли в выеделенном тексте (Editor state) ключ "ITALIC"
   */
  value: PropTypes.bool,
};

Italic.defaultProps = {

};

export default Italic;
