import React from 'react';
import './_action_clear.scss';
import PropTypes from 'prop-types';
import { ReactComponent as CLEAR } from '../../../../../assets/img/wysiwyg/clear-wysiwyg.svg';
import { Item } from '../../Layouts';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Очистить все стили в EditorState (Draft js)
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Clear = ({ onClick }) => (
  <Item onClick={() => onClick()}>
    <Tooltip text="Clear" offset={8}>
      <CLEAR />
    </Tooltip>
  </Item>
);

Clear.propTypes = {
  /**
   * Очистить выделенный текст по клику
   */
  onClick: PropTypes.func.isRequired,
};

Clear.defaultProps = {

};

export default Clear;
