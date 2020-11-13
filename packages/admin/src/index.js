import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './style/normalize.css';
import './style/grid.css';
import './style/style.css';
import './style/custom.css';

const root = document.createElement('div');
root.style.height = '100%';

document.body.appendChild(root);
ReactDOM.render(<App />, root);