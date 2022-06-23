import './_spinner.scss';
import React from 'react';

import spinner from '../../../assets/img/loader.png';

const Spinner = () => <img src={spinner} alt="spinner" className="editor__card-loader" />;

Spinner.propTypes = {};

export default Spinner;
