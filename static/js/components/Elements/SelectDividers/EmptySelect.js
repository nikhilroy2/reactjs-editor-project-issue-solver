import React from 'react';
import { ReactComponent as IconNone } from '../../../assets/img/no_shadow.svg';

const DividerNone = () => (
  <div className="editor__elements-select_dividers-list-item-none">
    <div className="editor__elements-select_dividers-list-item-none-icon">
      <IconNone />
    </div>
    <div className="editor__elements-select_dividers-list-item-none-title">
      None
    </div>
  </div>
);

export default DividerNone;
