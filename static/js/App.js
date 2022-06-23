import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './Main';
import store from './store';
import { history } from './history';
import Notifications from './components/Notifications';
import Redirect from './Redirect';
import DevTool from './devtool';
import { EDITOR_URL } from './config';
import ErrorBoundary from './components/ErrorBoundary';

export default () => (
  <Provider store={store}>
    <ErrorBoundary>
      <Router history={history}>
        <Notifications />
        <Switch>
          <Route exact path={`${EDITOR_URL}/:page_id`} component={Main} />
          <Route exact path="/admin/devtool" component={DevTool} />
          <Route component={Redirect} />
        </Switch>
      </Router>
    </ErrorBoundary>
  </Provider>
);
