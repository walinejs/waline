import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Forgot from './pages/forgot';
import Login from './pages/login';
import ManageComments from './pages/manage-comments';
import Migration from './pages/migration';
import Profile from './pages/profile';
import Register from './pages/register';
import User from './pages/user';
import { store } from './store';

function Access(props) {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const meta = props.meta || {};
    const basename = props.basename || '';
    const emptyUser = !user || !user.email;

    if (emptyUser) {
      return (location.href =
        basename +
        '/ui/login?redirect=' +
        location.pathname.replace(basename, ''));
    }

    const noPermission = meta.auth ? props.meta.auth !== user.type : false;

    if (noPermission) {
      return (location.href = basename + '/ui/profile');
    }
  }, [user, props.meta]);

  return user ? props.children : null;
}

export default function () {
  const match = location.pathname.match(/(.*?)\/ui/);
  const basePath = match ? match[1] : '/';

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
