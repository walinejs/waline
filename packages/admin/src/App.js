import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import Login from './pages/login';
import ManageComments from './pages/manage-comments';
import Register from './pages/register';
import Profile from './pages/profile';

function Access(props) {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const meta = props.meta || {};
    const basename = props.basename || '';
    const emptyUser = !user || !user.email;
    const noPermission =
      emptyUser || (meta.auth ? props.meta.auth !== user.type : false);
    if (emptyUser || noPermission) {
      return (location.href =
        basename + '/ui/login?redirect=' + location.pathname);
    }
  }, [user, props.meta]);

  return props.children;
}

export default function () {
  const match = location.pathname.match(/(.*?)\/ui/);
  const basepath = match ? match[1] : '/';

  return (
    <Provider store={store}>
      <Router basename={basepath}>
        <Routes>
          <Route
            path="/ui"
            exact
            element={
              <Access meta={{ auth: 'administrator' }} basename={basepath}>
                <ManageComments />
              </Access>
            }
          />
          <Route path="/ui/login" exact element={<Login />} />
          <Route path="/ui/register" exact element={<Register />} />
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
