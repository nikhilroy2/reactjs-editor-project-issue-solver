import React from 'react';
import './_locked-tab.scss';
import Button from '../Elements/Button';

const LockedTab = () => {
  const onReload = () => {
    window.location.reload(true);
  };

  return (
    <div className="editor__locked">
      <div className="">
        <div className="editor__locked-button">
          <Button onClick={() => onReload()}>Reload page</Button>
        </div>
        <div className="editor__locked-description">
          <p>This page has expired.</p>
          <p>You probably have an edit session in another tab or window.</p>
        </div>
      </div>
    </div>
  )
};

export default LockedTab;
