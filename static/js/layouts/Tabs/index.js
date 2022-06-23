import './_tabs.scss';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Tabs = ({
  tabs, tabWidth, activeTab, setActiveTab, styles, isNewChange,
}) => (
  <div>
    <div className="editor__tabs-wrapper">
      {tabs.map((item, index) => (
        <div className="editor__tabs-wrapper_tab-wrap" key={index}>
          <div
            className={classNames('editor__tabs-wrapper_tab',
              { active: activeTab.tab === item.tab })}
            onClick={() => setActiveTab(item)}
          >
            {item.name}
          </div>
          { isNewChange === item.tab ? <div className={classNames('editor__tabs-wrapper-dot animated fadeIn')} /> : null }
        </div>
      ))}
      <div
        className="editor__tabs-wrapper_tab-background"
        style={{
          ...styles,
          transform: `translateX(${activeTab.tab * tabWidth}px)`,
          width: activeTab.width,
        }}
      />
    </div>
  </div>
);

Tabs.defaultProps = {
  activeTab: {
    tab: 0,
    width: '92px',
  },
  styles: {
    width: '92px',
    left: '0px',
  },
  isNewChange: false,
};

Tabs.propTypes = {
  tabs: PropTypes.array,
  tabWidth: PropTypes.number,
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.object,
  styles: PropTypes.object,
  isNewChange: PropTypes.bool,
};

export default Tabs
