import React from 'react';
import { Router } from '@reach/router';
import { Provider, useSelector } from "react-redux";
import { store } from './store';
import Login from './pages/login';
import ManageComments from './pages/manage-comments';

export default function() {
  const routers = createRouter({
    routers: [
      { path: '/ui', component: ManageComments},
      { path: '/ui/login', component: Login, meta: { public: true }}
    ],
  });

  return <Provider store={store}>{routers}</Provider>;
}

export const createRouter = function(config) {
  const PrivateRoute = Comp => props => {
    // 检查用户登录状态
    const user = useSelector(state => state.user);
    console.log(user);
    if (!user) {
      return (location.href = '/ui/login');
    }
    return React.createElement(Comp, props);
  }

  return (
    <Router>
      {config.routers.map(({ path, component: Comp, meta = {} }, idx) =>
        Comp && React.createElement(meta.public ? Comp : PrivateRoute(Comp), {
          path,
          key: idx,
        })
      )}
    </Router>
  )
}
