import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Gradinet from './Gradient';
import Solid from './Solid';
import {
  PopupTabs,
  PopupTabsBody,
  PopupTabsHeader,
  PopupTabsHeaderLabel,
  PopupTabsBodyItem,
} from '../../../layouts/PopupTabs';
import { getIndexActiveTag } from './helper';

const ColorPicker = ({
  value, gradient, solid, onChange, forText,
}) => {
  const [activeTab, setActiveTab] = useState(getIndexActiveTag(value));

  const onChangeSolid = (value) => {
    onChange(value);
  };

  const onChangeGradient = (value) => {
    onChange(value);
  };

  useEffect(() => {
    if (solid && gradient) {
      setActiveTab(getIndexActiveTag(value));
    }
  }, [value, solid, gradient]);

  if (solid && gradient) {
    return (
      <PopupTabs activeTab={activeTab}>
        <PopupTabsHeader>
          <PopupTabsHeaderLabel tabID={0} onClick={() => setActiveTab(0)}>
            Solid
          </PopupTabsHeaderLabel>
          <PopupTabsHeaderLabel tabID={1} onClick={() => setActiveTab(1)}>
            Gradient
          </PopupTabsHeaderLabel>
        </PopupTabsHeader>
        <PopupTabsBody>
          <PopupTabsBodyItem tabID={0}>
            <Solid onChange={onChangeSolid} value={value} onClose={() => console.log('')} forText={forText} />
          </PopupTabsBodyItem>
          <PopupTabsBodyItem tabID={1}>
            <Gradinet onChange={onChangeGradient} value={value} onClose={() => console.log('')} />
          </PopupTabsBodyItem>
        </PopupTabsBody>
      </PopupTabs>
    );
  }

  return (
    <PopupTabs>
      <PopupTabsBody>
        {solid ? (
          <Solid onChange={onChangeSolid} value={value} onClose={() => console.log('')} forText={forText} />
        ) : (
          <></>
        )}
        {gradient ? (
          <Gradinet onChange={onChangeGradient} value={value} onClose={() => console.log('')} />
        ) : (
          <></>
        )}
      </PopupTabsBody>
    </PopupTabs>
  );
};

ColorPicker.defaultProps = {
  gradient: false,
  solid: false,
};

ColorPicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  gradient: PropTypes.bool,
  solid: PropTypes.bool,
  onChange: PropTypes.func,
  forText: PropTypes.bool,
};

export default ColorPicker;
