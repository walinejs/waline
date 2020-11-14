import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';

import './style/normalize.css';
import './style/grid.css';
import './style/style.css';
import './style/custom.css';

globalThis.serverURL = 'http://localhost:3000/';

async function run() {
  await Promise.all([
    store.dispatch({ type: 'user/loadUserInfo' }),
  ]).catch(e => {
    console.error(e)
  });

  const root = document.createElement('div');
  root.style.height = '100%';
  document.body.appendChild(root);

  ReactDOM.render((
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ), root);
}

run();
