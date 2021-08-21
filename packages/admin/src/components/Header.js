import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  const onLogout = function (e) {
    e.preventDefault();
    dispatch.user.logout();
    history.push('/ui/login');
  };

  const match = location.pathname.match(/(.*?)\/ui/);
  const basepath = match ? match[1] : '';
  return (
    <div className="typecho-head-nav clearfix" role="navigation">
      {user.type === 'administrator' ? (
        <nav id="typecho-nav-list">
          <ul className="root">
            <li className="parent">
              <Link to={basepath + '/ui'}>{t('management')}</Link>
            </li>
            <ul className="child">
              <li className="last">
                <Link to={basepath + '/ui'}>{t('comment')}</Link>
              </li>
            </ul>
          </ul>
        </nav>
      ) : null}

      <div className="operate">
        <Link to={basepath + '/ui/profile'} className="author">
          {user.display_name}
        </Link>
        <a className="exit" href="#" onClick={onLogout}>
          {t('logout')}
        </a>
      </div>
    </div>
  );
}
