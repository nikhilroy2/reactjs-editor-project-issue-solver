/* eslint-disable */
import React from 'react';
import { toast } from 'react-toastify';
import store from '../store';
import _ from 'lodash';

/**
 * @name onError
 * @function
 * @description Toast для ошибки
 * @param {object} error - объект
 */
const onError = (error) => {
  let errorMessage = '';
  if (error && error.hasOwnProperty('data')) {
    if (error.data.hasOwnProperty('error_message')) {
      if (_.isString(error.data.error_message)) {
        errorMessage = error.data.error_message;
      }
    }
  } else {
    errorMessage = 'Unknown error';
  }

  toast.error(errorMessage, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};

/**
 * @name publish
 * @function
 * @description Toast при успешном publish
 */
const publish = () => {
  const Content = () => {
    const state = store.getState();
    const activePage = state.pages && state.pages.activePage ? state.pages.activePage : '/';

    return (
      <div>
        <div className='' style={{ fontWeight: 'bold' }}>
          Pages published!
        </div>
        <a
          href={`${activePage.url === '/' ? '/' : '/' + activePage.url}`}
          target='_blank'
          style={{ color: '#ffffff', borderBottom: '1px dashed #ffffff', textDecoration: 'none' }}
        >
          View changes
        </a>
      </div>
    );
  };
  toast.success(Content, {
    position: 'bottom-right',
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
  });
};

export default {
  onError,
  publish,
};
