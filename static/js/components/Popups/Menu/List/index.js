import React from 'react';
import PropTypes from 'prop-types';
import './_menu-list.scss';
import Tooltip from '../../../Elements/Tooltip';
import { PopoverBody, PopoverHeader } from '../../../../layouts/Popover';
import { ReactComponent as PLUS } from '../../../../assets/img/plus.svg';
import SortableList from '../../../Elements/SortableList';
import { Animate, AnimateHiddenDiv } from '../../../../layouts/Animate';

const MenuList = ({
  list, onAddMenu, onSort, isFirstOpen, onChangeSettings,
}) => (
  <>
    <PopoverHeader>
      <Animate animate={!isFirstOpen ? '' : 'animated slideInRight faster-3'}>Manage menu</Animate>
      <div className="editor__sortable-create-item" onClick={onAddMenu}>
        <Tooltip text="Add new menu">
          <PLUS />
        </Tooltip>
      </div>
    </PopoverHeader>
    <PopoverBody overflow>
      <AnimateHiddenDiv>
        <Animate animate={!isFirstOpen ? '' : 'animated slideInRight faster-3'}>
          <SortableList
            list={list}
            onSort={onSort}
            onSettings={onChangeSettings}
          />
        </Animate>
      </AnimateHiddenDiv>
    </PopoverBody>
  </>
);

MenuList.defaultProps = {
  list: [
    {
      name: 'Item 1',
    },
  ],
};

MenuList.propTypes = {
  list: PropTypes.array,
  onAddMenu: PropTypes.func,
  onSort: PropTypes.func,
  onChangeSettings: PropTypes.func,
  isFirstOpen: PropTypes.any,
};

export default MenuList;
