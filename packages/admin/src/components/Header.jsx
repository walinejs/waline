// oxlint-disable no-underscore-dangle
import React, { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

import { LANGUAGE_OPTIONS } from '../locales/index.js';
import { buildAvatar } from '../pages/manage-comments/utils.js';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  const [latestVersion, setLatestVersion] = useState(null);

  const defaultLanguage = useMemo(() => {
    const option = LANGUAGE_OPTIONS.find((option) => option.alias.includes(i18n.language));

    return option?.value ?? '';
  }, [i18n.language]);

  useEffect(() => {
    if (!user?.objectId || !user?.__version) {
      return;
    }

    fetch('https://registry.npmjs.org/@waline/vercel/latest')
      .then((resp) => resp.json())
      .then((resp) => {
        if (user.__version === resp.version) {
          return;
        }

        setLatestVersion(resp.version);
      });
  }, [user?.objectId, user?.__version]);

  const updateLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const onLogout = (event) => {
    event.preventDefault();
    dispatch.user.logout();
    navigate('/ui/login');
  };

  const siteName = window.SITE_NAME || 'Waline';

  const navItems = [
    { to: '/ui', label: t('comment') },
    { to: '/ui/user', label: t('user') },
    { to: '/ui/migration', label: t('migration') },
  ];

  return [
    <header className="typecho-head-nav clear-fix" role="navigation" key="header">
      <div className="waline-admin-header">
        <div className="waline-admin-brand">
          <Link to="/ui" className="waline-admin-brand-link">
            <span className="waline-admin-brand-mark">W</span>
            <span className="waline-admin-brand-copy">
              <strong>{siteName}</strong>
              <small>{t('management')}</small>
            </span>
          </Link>
        </div>

        {user?.type === 'administrator' ? (
          <nav id="typecho-nav-list" className="waline-admin-nav">
            <ul className="root">
              {navItems.map((item) => (
                <li className="parent" key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="waline-admin-nav waline-admin-nav-static">
            <span>{t('management')}</span>
          </div>
        )}

        <div className="operate">
          <div className="language-select">
            <select defaultValue={defaultLanguage} onChange={updateLanguage}>
              {LANGUAGE_OPTIONS.map((options) => (
                <option key={options.value} value={options.value}>
                  {options.label}
                </option>
              ))}
            </select>
          </div>
          {user?.type ? (
            <Link to="/ui/profile" className="author">
              <img
                className="author-avatar"
                src={buildAvatar(user.email, user.avatar)}
                alt={user.display_name || 'Waline'}
              />
              <span className="author-name">{user.display_name}</span>
            </Link>
          ) : null}

          {user?.type ? (
            <button type="button" className="exit" onClick={onLogout}>
              {t('logout')}
            </button>
          ) : null}
        </div>
      </div>
    </header>,
    latestVersion ? (
      <div className="upgrade-tips clear-fix" key="upgrade">
        <Trans
          i18nKey="new version tips"
          defaults="New version @waline/vercel@{{version}} published, please upgrade it! Goto <a href='https://waline.js.org/en/advanced/faq.html#server' target='_blank'>FAQ</a> to find How to upgrade it."
          components={{
            // oxlint-disable-next-line id-length, jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content
            a: <a />,
          }}
          values={{
            version: latestVersion,
          }}
          transKeepBasicHtmlNodesFor={['a']}
        />
      </div>
    ) : null,
    user?.type ? (
      <div className="upgrade-tips clear-fix" key="leancloud-warning">
        <Trans
          i18nKey="leancloud warning"
          defaults="<a href='https://github.com/orgs/walinejs/discussions/3370' target='_blank'>Leancloud will cease external services soon</a>. If you are using it, please migration your comment data as soon as possible."
          components={{
            // oxlint-disable-next-line id-length, jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content
            a: <a />,
          }}
          transKeepBasicHtmlNodesFor={['a']}
        />
      </div>
    ) : null,
  ];
}
