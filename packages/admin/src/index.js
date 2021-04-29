import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';

import './i18n';

import './style/normalize.css';
import './style/grid.css';
import './style/style.css';
import './style/custom.css';

async function run() {
  await Promise.race([
    new Promise((resolve) => setTimeout(resolve, 50)),
    new Promise((resolve) => {
      window.addEventListener('message', (data) => {
        data && data.type === 'TOKEN' && data.data && resolve(data);
      });
    }),
    new Promise((resolve) => {
      const qs = new URLSearchParams(location.search);
      const token = qs.get('token');
      if (token) {
        resolve(token);
      }
    }),
  ]).then((token) => {
    if (!token) {
      return;
    }
    window.TOKEN = token;
    sessionStorage.setItem('TOKEN', token);
  });

  await Promise.all([store.dispatch({ type: 'user/loadUserInfo' })]).catch(
    (e) => {
      console.error(e);
    }
  );

  const root = document.createElement('div');
  root.style.height = '100%';
  document.body.appendChild(root);

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );
}

console.log(
  '%c @waline/admin %c v' + VERSION + ' ',
  'color: white; background: #0078E7; padding:5px 0;',
  'padding:4px;border:1px solid #0078E7;'
);
run();
