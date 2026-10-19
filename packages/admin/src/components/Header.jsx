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
  const [sites, setSites] = useState([]);

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

  useEffect(() => {
    if (!['administrator', 'super_admin'].includes(user?.type)) return;
    const token = window.TOKEN ?? sessionStorage.getItem('TOKEN') ?? localStorage.getItem('TOKEN');
    fetch(`${window.serverURL}site?lang=${i18n.language}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((resp) => resp.json())
      .then(({ data }) => {
        setSites(data ?? []);
        if (!localStorage.getItem('WALINE_SITE_ID') && data?.length) {
          localStorage.setItem(
            'WALINE_SITE_ID',
            data.find((site) => site.isDefault)?.siteId ?? data[0].siteId,
          );
        }
      })
      .catch(() => {});
  }, [user?.type, i18n.language]);

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
    ...(user?.type === 'super_admin'
      ? [
          { to: '/ui/user', label: t('user') },
          { to: '/ui/migration', label: t('migration') },
        ]
      : []),
    { to: '/ui/sites', label: 'Sites' },
  ];

  return [
    <header className="typecho-head-nav clear-fix" key="header">
      <div className="waline-header">
        <div className="waline-brand">
          <Link to="/ui" className="waline-brand-link">
            <span className="waline-brand-mark" />
            <span className="waline-brand-copy">
              <strong>{siteName}</strong>
            </span>
          </Link>
        </div>

        {['administrator', 'super_admin'].includes(user?.type) ? (
          <nav id="typecho-nav-list" className="waline-nav">
            <ul className="root">
              {navItems.map((item) => (
                <li className="parent" key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="operate">
          {sites.length ? (
            <select
              value={localStorage.getItem('WALINE_SITE_ID') ?? ''}
              onChange={(event) => {
                localStorage.setItem('WALINE_SITE_ID', event.target.value);
                location.reload();
              }}
            >
              {sites.map((site) => (
                <option value={site.siteId} key={site.siteId}>
                  {site.name}
                </option>
              ))}
            </select>
          ) : null}
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
