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
import { getUiPath } from './utils/ui.js';

const Access = (props) => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const meta = props.meta ?? {};
    const basename = props.basename ?? '';
    const emptyUser = !user?.objectId;
    const currentPath = location.pathname.replace(basename, '') || '/';
    const redirectPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    const buildPath = (path) => `${basename}${path}`.replaceAll(/\/+/gu, '/');

    if (emptyUser) {
      location.href = `${buildPath(getUiPath('login'))}?redirect=${redirectPath}`;
      return;
    }

    const noPermission = meta.auth ? meta.auth !== user.type : false;

    if (noPermission) {
      location.href = buildPath(getUiPath('profile'));
      return;
    }
  }, [user, props.meta, props.basename]);

  return user ? props.children : null;
};

export default function App() {
  const match = location.pathname.match(/(.*?)\/ui/u);
  const basePath = match ? match[1] : '/';
  const homePath = getUiPath();
  const userPath = getUiPath('user');
  const migrationPath = getUiPath('migration');
  const loginPath = getUiPath('login');
  const registerPath = getUiPath('register');
  const forgotPath = getUiPath('forgot');
  const profilePath = getUiPath('profile');

  return (
    <Provider store={store}>
      <div className="waline-admin-app">
        <Router basename={basePath}>
          <Routes>
            <Route
              path={homePath}
              exact
              element={
                <Access meta={{ auth: 'administrator' }} basename={basePath}>
                  <ManageComments />
                </Access>
              }
            />
            <Route
              path={userPath}
              exact
              element={
                <Access meta={{ auth: 'administrator' }} basename={basePath}>
                  <User />
                </Access>
              }
            />
            <Route
              path={migrationPath}
              exact
              element={
                <Access meta={{ auth: 'administrator' }} basename={basePath}>
                  <Migration />
                </Access>
              }
            />
            <Route path={loginPath} exact element={<Login />} />
            <Route path={registerPath} exact element={<Register />} />
            <Route path={forgotPath} exact element={<Forgot />} />
            <Route
              path={profilePath}
              exact
              element={
                <Access>
                  <Profile />
                </Access>
              }
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}
