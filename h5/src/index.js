import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { Toast } from 'antd-mobile';
import stores from './store/index';
import './style/index.scss';

configure({ enforceActions: 'always' });

Toast.config({
  duration: 1,
  mask: false
});

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

