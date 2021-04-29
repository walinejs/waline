import React from 'react';
import { Router } from '@reach/router';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import Login from './pages/login';
import ManageComments from './pages/manage-comments';
import Register from './pages/register';
import Profile from './pages/profile';

export default function () {
  const routers = createRouter({
    routers: [
      {
        path: '/ui',
        component: ManageComments,
        meta: { auth: 'administrator' },
      },
      { path: '/ui/login', component: Login, meta: { public: true } },
      { path: '/ui/register', component: Register, meta: { public: true } },
      { path: '/ui/profile', component: Profile },
    ],
  });

  return <Provider store={store}>{routers}</Provider>;
}

export const createRouter = function (config) {
  const PrivateRoute = (Comp, meta) => (props) => {
    const user = useSelector((state) => state.user);

    const emptyUser = !user || !user.email;
    const noPermission =
      emptyUser || (meta.auth ? meta.auth !== user.type : false);
    if (emptyUser || noPermission) {
      return (location.href = '/ui/login?redirect=' + location.pathname);
    }

    return React.createElement(Comp, props);
  };

  const match = location.pathname.match(/(.*?)\/ui/);
  const basepath = match ? match[1] : '/';
  return (
    <Router basepath={basepath}>
      {config.routers.map(
        ({ path, component: Comp, meta = {} }, idx) =>
          Comp &&
          React.createElement(meta.public ? Comp : PrivateRoute(Comp, meta), {
            path,
            key: idx,
          })
      )}
    </Router>
  );
};
