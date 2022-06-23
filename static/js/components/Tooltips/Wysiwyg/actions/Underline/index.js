import React from 'react';
import './_action_underline.scss';
import PropTypes from 'prop-types';
import { ReactComponent as UNDERLINE } from '../../../../../assets/img/wysiwyg/underline.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Подчеркнуть текст (UNDERLINE)
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Underline = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={() => onClick('UNDERLINE')} active={activeButton}>
      <Tooltip text="Underline" offset={8}>
        <UNDERLINE />
      </Tooltip>
    </Item>
  );
};

Underline.propTypes = {
  /**
   * Отдаем ключ для EditorState (DraftJS)
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Есть ли в выеделенном тексте (Editor state) ключ "UNDERLINE"
   */
  value: PropTypes.bool,
};

Underline.defaultProps = {};

export default Underline;
