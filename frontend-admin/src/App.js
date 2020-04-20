import React from 'react';
import './global.less';
import { Router, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { Provider } from 'react-redux';
import indexRoutes from './routes/index.jsx';
import store from './store';
import hist from './history';

import './config/axios_conf';

const App = props => (
  <Provider store={store}>
    <Router history={hist}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          {indexRoutes.map((prop, key) => (
            <Route path={prop.path} component={prop.component} key={key} />
          ))}
        </Switch>
      </QueryParamProvider>
    </Router>
  </Provider>
);

export default App;
