import React from 'react';
import './_empty-settings.scss';
import { ReactComponent as ChooseComponent } from '../../../../assets/img/Choose-component.svg';

export default () => (
  <div className="editor__component-empty-settings">
    <div className="editor__component-empty-block">
      <div className="editor__component-empty-image">
        <ChooseComponent />
      </div>
      <div className="editor__component-empty-description">
        Click on the component on the left to start editing
      </div>
    </div>
  </div>
);
