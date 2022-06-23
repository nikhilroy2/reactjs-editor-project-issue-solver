import './Polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './assets/scss/main.scss';
import App from './App';

import { errorsIgnore, notAllowUrls } from './services/helper';

if (!window?.appConfig?.is_dev) {
  Sentry.init({
    dsn: 'https://f903821ce2b246bfbb5f49860ba42f59@o149500.ingest.sentry.io/5371767',
    ignoreErrors: errorsIgnore,
    denyUrls: notAllowUrls,
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
