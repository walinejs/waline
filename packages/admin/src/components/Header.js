import React from 'react';
import { Link } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

export default function() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onLogout = function(e) {
    e.preventDefault();
    dispatch.user.logout();
  }

  return (
    <div className="typecho-head-nav clearfix" role="navigation">
      {user.type === 'administrator' ? (
        <nav id="typecho-nav-list">
          <ul className="root">
            <li className="parent">
              <Link to="/ui">管理</Link>
            </li>
            <ul className="child">
              <li className="last">
                <Link to="/ui">评论</Link>  
              </li>
            </ul>
          </ul>  
        </nav>
      ) : null}
      
      <div className="operate">
        <Link to="/ui/profile" className="author">{user.display_name}</Link>
        <a className="exit" href="#" onClick={onLogout}>登出</a>
      </div>
  </div>
  )
}