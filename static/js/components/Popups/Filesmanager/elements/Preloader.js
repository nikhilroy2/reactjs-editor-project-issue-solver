import React from 'react';
import Spinner from '../../../../layouts/Loaders/Spinner';

const Preloader = () => (
  <div className="editor__filesmanager-preloader">
    <Spinner theme="dark" />
  </div>
);

export default Preloader
