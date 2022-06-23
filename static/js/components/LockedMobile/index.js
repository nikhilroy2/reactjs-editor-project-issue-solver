import React from 'react';
import './_locked-mobile.scss';
import { ReactComponent as Preview } from '../../assets/img/locked_mobile.svg';

/**
 * LockedTab - Заглушка для тех кто заходит с мобильных устройств
 *
 * @component
 * @category Components
 *
 */
const LockedTab = () => (
  <div className="locked-mobile">
    <div className="locked-mobile__block animated fadeIn">
      <div className="locked-mobile__block-preview">
        <Preview />
      </div>
      <div className="locked-mobile__block-header">
        Editing is not supported for this device.
      </div>
      <div className="locked-mobile__block-description">
        Please switch to a desktop PC or a laptop to use the visual editor.
      </div>
      <div className="locked-mobile__block-actions">
        <a href="/admin/appearance/themes">Go back</a>
      </div>
    </div>
  </div>
);

export default LockedTab;
