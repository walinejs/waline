import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';

import Forgot from './pages/forgot/index.jsx';
import Login from './pages/login/index.jsx';
import ManageComments from './pages/manage-comments/index.jsx';
import Migration from './pages/migration/index.jsx';
import Profile from './pages/profile/index.jsx';
import Register from './pages/register/index.jsx';
import User from './pages/user/index.jsx';
import { store } from './store/index.js';

const Access = (props) => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const meta = props.meta ?? {};
    const basename = props.basename ?? '';
    const emptyUser = !user?.objectId;
    const currentPath = location.pathname.replace(basename, '') || '/';
    const redirectPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

    if (emptyUser) {
      location.href = `${basename}/ui/login?redirect=${redirectPath}`;
      return;
    }

    const noPermission = meta.auth ? meta.auth !== user.type : false;

    if (noPermission) {
      location.href = `${basename}/ui/profile`;
    }
  }, [user, props.meta, props.basename]);

  return user ? props.children : null;
};

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
