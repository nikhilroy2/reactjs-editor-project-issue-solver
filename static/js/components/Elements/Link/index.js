import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './_link.scss';

import Tabs from '../../../layouts/Tabs';

import Internal from './Internal';
import External from './External';
import Anchor from './Anchor';

import Switch from '../Switch';
import { FormGroup, FormHorizontal } from '../../../layouts/Form';
import { getActiveTab } from './helper';
import { tabs, tabWidth } from './constants';
import { Swipe, SwipeItem } from '../../../layouts/Swipe';

const Link = ({
  onChange, value, type, blank,
}) => {
  const [data, setData] = useState({
    isLoaded: false,
    activeTab: getActiveTab(type),
    value,
    type,
    external: type === 'web' ? value : '',
    blank,
  });

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      isLoaded: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.isLoaded && (data.value !== value || data.external !== value)) {
      onChange({
        type: data.type,
        value: data.type === 'web' ? data.external : data.value,
        blank: data.blank,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.value, data.blank, data.external]);

  const onChangeBlank = (value) => {
    setData((prevState) => ({
      ...prevState,
      blank: value,
    }));
  };

  const onChangeType = (activeTab) => {
    let value;
    let type;
    let external;

    switch (activeTab.tab) {
      case 0:
        value = data.value;
        external = data.external;
        type = 'page';
        break;
      case 1:
        value = data.value;
        external = data.external;
        type = 'web';
        break;
      case 2:
        value = data.value;
        external = data.external;
        type = 'anchor';
        break;
      default:
        break;
    }

    setData((prevState) => ({
      ...prevState,
      type,
      value,
      external,
      activeTab,
    }));
  };

  const onChangeValue = (value) => {
    setData((prevState) => ({
      ...prevState,
      value,
      external: value === 0 ? prevState.external : '',
    }));
  };

  const onChangeExternalValue = (value) => {
    setData((prevState) => ({
      ...prevState,
      external: value,
    }));
  };

  return (
    <>
      <Tabs tabs={tabs} activeTab={data.activeTab} setActiveTab={onChangeType} tabWidth={tabWidth} />
      <div className="editor__link-section">
        <Swipe active={data.activeTab.tab}>
          <SwipeItem swipeKey={0} key={0}>
            <Internal value={data.value} onChange={onChangeValue} type={type} />
          </SwipeItem>
          <SwipeItem swipeKey={1} key={1}>
            <External value={data.external} onChange={onChangeExternalValue} />
          </SwipeItem>
          <SwipeItem swipeKey={2} key={2}>
            <Anchor value={data.value} onChange={onChangeValue} type={type} />
          </SwipeItem>
        </Swipe>
      </div>
      <FormGroup>
        <FormHorizontal label="Open in a new window">
          <Switch onChange={(value) => onChangeBlank(value)} value={data.blank} />
        </FormHorizontal>
      </FormGroup>
    </>
  );
};

Link.defaultProps = {
  value: '',
  type: 'web',
  blank: false,
};

Link.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  blank: PropTypes.bool,
};

export default Link;
