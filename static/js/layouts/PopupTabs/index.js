import React from 'react';
import PropTypes from 'prop-types';
import './_popup_tabs.scss';
import classNames from 'classnames';

export const PopupTabs = ({ children, activeTab }) => {
  const childrenContact = React.Children.map(children, (child) => React.cloneElement(child, {
    activeTab,
  }));

  return <div className="editor__popup_tabs">{childrenContact}</div>;
};

PopupTabs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  activeTab: PropTypes.number,
};

export const PopupTabsHeaderLabel = ({
  children, activeTab, tabID, onClick,
}) => (
  <div
    className={classNames('editor__popup_tabs-header-label', {
      'editor__popup_tabs-header-label-active': activeTab === tabID,
    })}
    onClick={onClick}
  >
    {children}
  </div>
);

PopupTabsHeaderLabel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  activeTab: PropTypes.number,
  tabID: PropTypes.number,
  onClick: PropTypes.func,
};

export const PopupTabsHeader = ({ children, activeTab }) => {
  const childrenContact = React.Children.map(children, (child) => React.cloneElement(child, {
    activeTab,
  }));
  return <div className="editor__popup_tabs-header">{childrenContact}</div>;
};

PopupTabsHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  activeTab: PropTypes.number,
};

export const PopupTabsBody = ({ children, activeTab }) => {
  const childrenContact = React.Children.map(children, (child) => React.cloneElement(child, {
    activeTab,
  }));

  return <div className="editor__popup_tabs-body">{childrenContact}</div>;
};

PopupTabsBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  activeTab: PropTypes.number,
};

export const PopupTabsBodyItem = ({ children, activeTab, tabID }) => {
  if (activeTab === tabID) {
    return <div className="editor__popup_tabs-body-item">{children}</div>;
  }

  return null;
};

PopupTabsBodyItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  activeTab: PropTypes.number,
  tabID: PropTypes.number,
};
