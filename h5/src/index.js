import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'mobx-react';
import Store from './store/index';
import './style/index.scss';

ReactDOM.render(
  <Provider Store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

