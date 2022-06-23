import React from 'react';
import './_render.scss';
import classNames from 'classnames';

const WrapperNode = ({
  domElement, children, activeItem, onClick,
}) => {
  const active = activeItem !== 'default' ? activeItem : false;

  if (domElement.actions) {
    return (
      <div
        className={classNames('editor__actions-node', {
          'editor__component-action-disabled': !!(active && active !== domElement.actions),
          'editor__component-action-active': !!(active && active === domElement.actions),
        })}
        onClick={onClick}
      >
        <div className="editor__actions-node-hover" />
        {children}
      </div>
    );
  }

  return children;
};

export default WrapperNode;
