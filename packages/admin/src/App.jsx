import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';

import Access from './components/Access.jsx';
import Forgot from './pages/forgot/index.jsx';
import Login from './pages/login/index.jsx';
import ManageComments from './pages/manage-comments/index.jsx';
import Migration from './pages/migration/index.jsx';
import Profile from './pages/profile/index.jsx';
import Register from './pages/register/index.jsx';
import User from './pages/user/index.jsx';
import { store } from './store/index.js';

export default function App() {
  const basePath = location.pathname.match(/(.*?)\/ui/u)?.[1] ?? '/';

  return (
    <Provider store={store}>
      <Router basename={basePath}>
        <Routes>
          <Route
            path="/ui"
            exact
            element={
              <Access meta={{ auth: 'administrator' }} basename={basePath}>
                <ManageComments />
              </Access>
            }
          />
          <Route
            path="/ui/user"
            exact
            element={
              <Access meta={{ auth: 'administrator' }} basename={basePath}>
                <User />
              </Access>
            }
          />
          <Route
            path="/ui/migration"
            exact
            element={
              <Access meta={{ auth: 'administrator' }} basename={basePath}>
                <Migration />
              </Access>
            }
          />
          <Route path="/ui/login" exact element={<Login />} />
          <Route path="/ui/register" exact element={<Register />} />
          <Route path="/ui/forgot" exact element={<Forgot />} />
          <Route
            path="/ui/profile"
            exact
            element={
              <Access>
                <Profile />
              </Access>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}
