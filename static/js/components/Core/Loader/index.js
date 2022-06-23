import React from 'react';
import './_loader.scss';
import { ReactComponent as PreloaderIcon } from '../../../assets/img/main_loader.svg';

const Loader = () => (
  <>
    <div className="editor__loader">
      <div className="main-loader main-loader-cog">
        <PreloaderIcon />
        <span className="main-loader-header animated fadeIn faster">Loading</span>
        <span className="main-loader-description animated fadeIn faster">Please wait a little.</span>
      </div>
    </div>
  </>
);

export default Loader;
