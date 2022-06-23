import React from 'react';
import PropTypes from 'prop-types';
import { PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import { PopupMenu, PopupMenuItem } from '../../../layouts/PopupMenu';
import { Animate, AnimateHiddenDiv } from '../../../layouts/Animate';

const IconMenus = ({
  firstClick, settingIcon, onChangeActiveTab,
}) => (
  <>
    <PopoverHeader>
      <Animate animate={firstClick ? 'animated slideInLeft faster-3' : ''}>Icon</Animate>
    </PopoverHeader>
    <PopoverBody>
      <AnimateHiddenDiv>
        <Animate animate={firstClick ? 'animated slideInRight faster-3' : ''}>
          <PopupMenu>
            {settingIcon && settingIcon.icon
              ? <PopupMenuItem onClick={() => onChangeActiveTab(1)}>Icon library</PopupMenuItem>
              : null}
            {settingIcon && settingIcon.styles
              ? <PopupMenuItem onClick={() => onChangeActiveTab(2)}>Icon styles</PopupMenuItem>
              : null}
          </PopupMenu>
        </Animate>
      </AnimateHiddenDiv>
    </PopoverBody>
  </>
);

IconMenus.propTypes = {
  firstClick: PropTypes.bool,
  settingIcon: PropTypes.object,
  onChangeActiveTab: PropTypes.func,
};

export default IconMenus;
