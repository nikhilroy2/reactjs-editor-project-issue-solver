import React from 'react';
import './_action_bold.scss';
import PropTypes from 'prop-types';
import { ReactComponent as BOLD } from '../../../../../assets/img/wysiwyg/bold.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Жирность текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Bold = ({ onClick, value }) => {
  const activeButton = value || false;

  return (
    <Item onClick={() => onClick('BOLD')} active={activeButton}>
      <Tooltip text="Bold" offset={8}>
        <BOLD />
      </Tooltip>
    </Item>
  );
};

Bold.propTypes = {
  /**
   * Отдаем ключ для EditorState (DraftJS)
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Есть ли в выеделенном тексте (Editor state) ключ "BOLD"
   */
  value: PropTypes.bool,
};

Bold.defaultProps = {

};

export default Bold;
