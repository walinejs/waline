import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';

import './i18n';

import './style/index.scss';

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

  const container = document.createElement('div');
  container.style.height = '100%';
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

console.log(
  '%c @waline/admin %c v' + VERSION + ' ',
  'color: white; background: #0078E7; padding:5px 0;',
  'padding:4px;border:1px solid #0078E7;'
);
run();
