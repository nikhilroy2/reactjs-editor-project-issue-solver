/* eslint-disable */
import React, {useState} from 'react';
import './_icons-select.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {PopoverBody, PopoverHeader} from '../../../layouts/Popover';
import {Animate, AnimateHiddenDiv} from '../../../layouts/Animate';
import Input from '../Input';
import IconsList from '../Icons';
import {getFontsList} from '../../Popups/SettingsIcon/helper';

const List = ({ nodeList, value, onChange }) => {
  const [search, setSearch] = useState('');
  const [list] = useState(getFontsList());

  return (
    <>
      <div className="editor__elements-select-icons-modal" id="editor-icon-select" ref={nodeList}>
        <PopoverHeader>
          <div className="w-100">
            <Animate animate="animated slideInRight faster-3">
              <Input
                value={search}
                placeholder={`Search icon`}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Animate>
          </div>
        </PopoverHeader>
        <PopoverBody>
          <AnimateHiddenDiv>
            <Animate animate="animated slideInRight faster-3">
              <IconsList
                value={value}
                searchValue={search}
                onChange={onChange}
                list={list}
              />
            </Animate>
          </AnimateHiddenDiv>
        </PopoverBody>
      </div>
    </>
  );
}

List.defaultProps = {
  value: 'fad fa-image-polaroid'
};

List.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default List;
