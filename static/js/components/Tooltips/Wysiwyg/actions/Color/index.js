import React, {
  useState, useRef, forwardRef,
} from 'react';
import './_action_color.scss';
import PropTypes from 'prop-types';
import { Item } from '../../Layouts';
import ColorsLibrary from '../../../../Popups/ColorsLibrary';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Цвет выделенного текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Color = forwardRef((props, ref) => {
  const { onChange, value } = props;
  const [isOpenColorLibrary, setOpenColorLibrary] = useState(false);
  const node = useRef(null);

  const openColorLibrary = () => {
    setOpenColorLibrary((prevState) => !prevState);
  };

  return (
    <>
      <Item onClick={() => openColorLibrary()}>
        <Tooltip text="Colors" offset={12}>
          <div className="wysiwyg-actions__item-color" ref={node}>
            <div
              className="wysiwyg-actions__item-color-preview"
              style={{ backgroundColor: value || 'transparent' }}
            />
          </div>
        </Tooltip>
      </Item>

      {isOpenColorLibrary ? (
        <ColorsLibrary
          color={value || false}
          parentNode={node}
          ref={ref}
          solid
          forText
          onClose={(value) => setOpenColorLibrary(value)}
          onChange={(value) => onChange('color', value)}
        />
      ) : null}
    </>
  );
});

Color.propTypes = {
  /**
   * Передаем ключ colors для EditorState
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Цвет выделенного текста
   */
  value: PropTypes.string,
};

Color.defaultProps = {

};

export default Color;
