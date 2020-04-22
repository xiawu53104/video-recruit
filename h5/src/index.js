import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './store/index';
import './style/index.scss';

configure({ enforceActions: 'always' });

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

