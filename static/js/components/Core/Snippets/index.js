import React from 'react';
import PropTypes from 'prop-types';
import './_snippets.scss';

const Snippets = ({ title, type }) => {
  const colorClass = () => {
    switch (type) {
      case 'navbar':
        return 'editor__empty-snippet-navbar';
      case 'header':
      case 'footer':
        return 'editor__empty-snippet-header-footer';
      default:
        return 'editor__empty-snippet-page';
    }
  };
  return (
    <>
      <div className="editor__empty-snippet">
        <div className={`editor__empty-snippet-title ${colorClass()}`}>{title}</div>
      </div>
      <div
        className={`editor__empty-snippet-border editor__empty-snippet-border-top ${colorClass()}`}
      />
      <div
        className={`editor__empty-snippet-border editor__empty-snippet-border-left ${colorClass()}`}
      />
      <div
        className={`editor__empty-snippet-border editor__empty-snippet-border-right ${colorClass()}`}
      />
      <div
        className={`editor__empty-snippet-border editor__empty-snippet-border-bottom ${colorClass()}`}
      />
    </>
  );
};

Snippets.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
};

export default Snippets;
