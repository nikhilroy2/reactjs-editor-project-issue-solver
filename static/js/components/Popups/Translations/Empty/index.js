/*eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../../layouts/Loaders/Spinner';
import Button from '../../../Elements/Button';
import Input from '../../../Elements/Input';
import {PopoverHeader, PopoverBody} from '../../../../layouts/Popover';

const TranslationsEmpty = ({ name }) => {

  return (
    <>
      <PopoverHeader>
        <div className="editor-translations__header">
          <div className="editor-translations__header-left">
            <div className="editor-translations__header-title">{name}</div>
          </div>
        </div>
      </PopoverHeader>
      <PopoverBody>
        <div className="editor-translations__body scrollbar-light d-flex align-items-center justify-content-center">
          <div>
            <Spinner theme={'dark'} /> Loading translations...
          </div>
        </div>
      </PopoverBody>
    </>
  );
};

TranslationsEmpty.defaultProps = {
  name: "Language"
};

TranslationsEmpty.propTypes = {
  name: PropTypes.string
};

export default TranslationsEmpty;
