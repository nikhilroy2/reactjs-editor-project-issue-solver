import './_dividers.scss';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Methods from '../../../../utils/Methods/index';
import { getObjectSource } from '../../../../utils/SourceValue';

import SettingsDivider from '../../../Popups/SettingsDivider';

const Dividers = ({ direction, dataID, value }) => {
  const [isOpenDividerSettings, setOpenDividerSettings] = useState(false);
  const node = useRef(null);
  const block = Methods.getData(dataID);

  const directionTop = direction === 'top';
  const directionBottom = direction === 'bottom';
  const divider_top = _.cloneDeep(getObjectSource(block.data, value.value));
  const divider_bottom = _.cloneDeep(getObjectSource(block.data, value.value));

  const dividerData = directionTop ? divider_top : directionBottom ? divider_bottom : {};

  if (direction) {
    return (
      <>
        <div
          className={classNames(' ', {
            'editor__divider-top': direction === 'top',
            'editor__divider-bottom': direction === 'bottom',
          })}
          ref={node}
          onClick={() => setOpenDividerSettings(true)}
          data-for={direction === 'top' ? 'top' : 'bottom'}
          data-tip="Divider"
          data-iscapture="true"
        />
        {isOpenDividerSettings ? (
          <SettingsDivider
            parentNode={node}
            dataID={dataID}
            dividerData={dividerData}
            source={value}
            onClose={() => setOpenDividerSettings(false)}
            direction={direction}
          />
        ) : null}
        <ReactTooltip className="customeTheme" id="bottom" place="top" type="dark" effect="float" />
        <ReactTooltip className="customeTheme" id="top" place="bottom" type="dark" effect="float" />
      </>
    );
  }

  return null;
};

Dividers.propTypes = {
  direction: PropTypes.string,
  dataID: PropTypes.number,
  value: PropTypes.object,
};

export default Dividers;
