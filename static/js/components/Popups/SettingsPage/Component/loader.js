import React from 'react';
import './_loader.scss';
import { CSSTransition } from 'react-transition-group';
import Spinner from '../../../../layouts/Loaders/Spinner';

const Loader = () => (
  <CSSTransition in appear unmountOnExit timeout={500} classNames="alert">
    <div className="editor-preloader">
      <div className="main-loader main-loader-cog">
        <Spinner theme="dark" />
      </div>
    </div>
  </CSSTransition>
);

export default Loader;
