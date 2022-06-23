/*eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import './_translation-loader.scss';
import PropTypes from 'prop-types';
import Spinner from '../../../../layouts/Loaders/Spinner';

const TranslationsLoader = ({ name }) => {

  return (
    <div className={'editor-translations__loader'}>
      <Spinner theme="dark" />
    </div>
  );
};

TranslationsLoader.defaultProps = {
  name: "Language"
};

TranslationsLoader.propTypes = {
  name: PropTypes.string
};

export default TranslationsLoader;
