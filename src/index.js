import React from 'react';
import { Provider } from 'react-redux';
import './config/StatusBarConfig';

import './config/ReactotronConfig';
import store from './store';

import App from './app';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
