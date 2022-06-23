import React from 'react';
import PropTypes from 'prop-types';
import './_menu-list.scss';
import { PopoverBody, PopoverHeader } from '../../../../layouts/Popover';
import SortableList from '../../../Elements/SortableList';
import { Animate, AnimateHiddenDiv } from '../../../../layouts/Animate';

const TotalsList = ({
  list, onSort, onChangeVisibility,
}) => (
  <>
    <PopoverHeader>
      <Animate>Manage counts</Animate>
    </PopoverHeader>
    <PopoverBody overflow>
      <AnimateHiddenDiv>
        <Animate>
          <SortableList
            list={list}
            onSort={onSort}
            onChangeVisibility={onChangeVisibility}
          />
        </Animate>
      </AnimateHiddenDiv>
    </PopoverBody>
  </>
);

TotalsList.defaultProps = {
  list: [
    {
      name: 'Item 1',
    },
  ],
};

TotalsList.propTypes = {
  list: PropTypes.array,
  onSort: PropTypes.func,
  onChangeVisibility: PropTypes.func,
};

export default TotalsList;
