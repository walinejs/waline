import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from 'classnames';

import Header from '../../components/Header.jsx';
import Paginator from '../../components/Paginator.jsx';
import { getUserList, updateUser, deleteUser } from '../../services/user.js';
import { buildAvatar } from '../manage-comments/utils.js';
import * as Icons from '../../components/icon/index.js';

// oxlint-disable-next-line max-lines-per-function
export default function User() {
  const currentUser = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [list, setList] = useState({
    page: 1,
    totalPages: 0,
    spamCount: 0,
    waitingCount: 0,
    data: [],
  });

  useEffect(() => {
    getUserList({ page: list.page }).then((data) => {
      setList({ ...list, ...data });
    });
  }, [list.page]);

  const createActions = (user) =>
    [
      {
        key: 'administrator',
        name: t('set administrator'),
        show: user.type === 'guest',
        async action(event) {
          event.preventDefault();

          await updateUser({
            id: user.objectId,
            type: 'administrator',
          });
          user.type = 'administrator';
          setList({ ...list });
        },
      },
      {
        key: 'guest',
        name: t('set guest'),
        show: user.type === 'administrator',
        async action(event) {
          event.preventDefault();
          if (user.objectId === currentUser.objectId) {
            alert(t("You can't set yourself to be guest!"));

            return;
          }

          await updateUser({
            id: user.objectId,
            type: 'guest',
          });
          user.type = 'guest';
          setList({ ...list });
        },
      },
      {
        key: 'label',
        name: t('set label'),
        show: true,
        async action(event) {
          event.preventDefault();

          const label = prompt(t('please enter an exclusive label'));

          await updateUser({
            id: user.objectId,
            label,
          });
          user.label = label;
          setList({ ...list });
        },
      },
      {
        key: 'delete',
        name: t('delete'),
        show: user.objectId !== currentUser.objectId,
        async action(event) {
          event.preventDefault();

          if (!confirm(t('delete user confirm'))) {
            return;
          }

          await deleteUser({
            id: user.objectId,
          });
          setList({
            ...list,
            data: list.data.filter(({ objectId }) => objectId !== user.objectId),
          });
        },
      },
    ].filter(({ show }) => show);

  const getRole = (type) => {
    if (type.startsWith('verify')) {
      return t('verify');
    }

    return t(type);
  };

  const socials = Array.isArray(window.oauthServices)
    ? window.oauthServices.map(({ name }) => name)
    : ['oidc', 'qq', 'weibo', 'github', 'twitter', 'facebook','huawei'];

  return (
    <>
      <Header />
      <div className="main">
        <div className="body container">
          <div className="typecho-page-title">
            <h2>{t('manage users')}</h2>
          </div>
          <div className="row typecho-page-main" role="main">
            <div className="col-mb-12 typecho-list">
              <form method="post" name="manage_comments" className="operate-form">
                <div className="typecho-table-wrap">
                  <table className="typecho-list-table">
                    <colgroup>
                      <col width="6%" />
                      <col width="15%" />
                      <col width="20%" />
                      <col width="15%" />
                      <col width="20%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th> </th>
                        <th>{t('nickname')}</th>
                        <th>{t('email')}</th>
                        <th>{t('role')}</th>
                        <th>{t('exclusive label')}</th>
                        <th>{t('action')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.data
                        .filter((user) => user)
                        .map((user) => (
                          <tr id={`user-${user.objectId}`} key={user.objectId}>
                            <td style={{ verticalAlign: 'top' }}>
                              <div className="user-avatar">
                                <img
                                  className="avatar"
                                  src={buildAvatar(user.email, user.avatar)}
                                  alt={user.display_name}
                                  width="40"
                                  height="40"
                                />
                              </div>
                            </td>
                            <td>
                              <a
                                href={
                                  user.url?.startsWith('https://')
                                    ? user.url
                                    : `https://${user.url}`
                                }
                                rel="external nofollow noreferrer"
                                target="_blank"
                              >
                                {user.display_name}
                              </a>
                            </td>
                            <td>
                              <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer">
                                {user.email}
                              </a>
                              <br />
                              {socials.map((social) => (
                                <a
                                  key={social}
                                  href={
                                    user[social] && social !== 'oidc'
                                      ? `https://${social}.com/${user[social]}`
                                      : ``
                                  }
                                  target={user[social] ? '_blank' : '_self'}
                                  rel="noreferrer"
                                  className={cls('account-item', 'user-page-account-item', social, {
                                    bind: user[social],
                                  })}
                                >
                                  {React.createElement(Icons[social])}
                                </a>
                              ))}
                            </td>
                            <td>{getRole(user.type)}</td>
                            <td>{user.label}</td>
                            <td className="comment-action">
                              {createActions(user).map(({ key, disable, name, action }) =>
                                disable ? (
                                  <span className="weak" key={key}>
                                    {name}
                                  </span>
                                ) : (
                                  <a key={key} className={`operate-${key}`} onClick={action}>
                                    {name}
                                  </a>
                                ),
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </form>

              <div className="typecho-list-operate clear-fix">
                <form method="get">
                  <Paginator
                    current={list.page}
                    total={list.totalPages}
                    onChange={(page) => setList({ ...list, page })}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
