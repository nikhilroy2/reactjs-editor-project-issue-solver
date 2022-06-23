import './_spinner.scss';
import React from 'react';
import PropTypes from 'prop-types';

import spinnerWhite from '../../../assets/img/loading-white.png';
import spinnerBlack from '../../../assets/img/loader.png';

const Spinner = ({ theme }) => (
  <img
    src={theme === 'white' ? spinnerWhite : spinnerBlack}
    alt="spinner"
    className="editor__publish-loader"
  />
);

Spinner.propTypes = {
  theme: PropTypes.string,
};

Spinner.defaultProps = {
  theme: 'white',
};

export default Spinner;
