import React, { useState, useRef } from 'react';
import './_action_link.scss';
import PropTypes from 'prop-types';
import { ReactComponent as LINK } from '../../../../../assets/img/wysiwyg/link.svg';
import { Item } from '../../Layouts';
import SettingsLink from '../../../../Popups/SettingsLink';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Ссылка
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Link = ({ onChange, refNode, value }) => {
  const [isOpenLink, setOpenLink] = useState(false);
  const node = useRef(null);

  return (
    <Item active={value || false} onClick={() => setOpenLink(true)}>
      {isOpenLink ? (
        <SettingsLink
          rootNode={node}
          value={value}
          onChange={onChange}
          refNode={refNode}
          onClose={() => setOpenLink(false)}
        />
      ) : null}
      <Tooltip text="Link" offset={8}>
        <LINK ref={node} />
      </Tooltip>
    </Item>
  );
};

Link.propTypes = {
  /**
   * Возвращаем новый объект ссылкой для EditorState (DraftJS)
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Ref кнопки тултипа
   */
  refNode: PropTypes.object,
  /**
   * Объект с информацией о ссылеке type | value
   */
  value: PropTypes.any,
};

Link.defaultProps = {};

export default Link;
