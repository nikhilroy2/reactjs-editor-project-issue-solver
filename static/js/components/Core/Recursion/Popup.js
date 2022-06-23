import React from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from '../../Popups/SettingsIcon';
import SettingsImage from '../../Popups/SettingsImage';
import SettingsLink from '../../Popups/SettingsLink';

const Popup = ({
  popup, rootNode, dataID, onClose,
}) => (
  <>
    {popup.icon ? (
      <SettingsIcon settingIcon={popup.icon} rootNode={rootNode} dataID={dataID} onClose={onClose} />
    ) : null}
    {popup.image ? (
      <SettingsImage settingImage={popup.image} rootNode={rootNode} dataID={dataID} onClose={onClose} />
    ) : null}
    {popup.link ? <SettingsLink value={popup.link} rootNode={rootNode} dataID={dataID} onClose={onClose} /> : null}
  </>
);

Popup.propTypes = {
  popup: PropTypes.object,
  rootNode: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  dataID: PropTypes.number,
  onClose: PropTypes.func,
};

export default Popup;
