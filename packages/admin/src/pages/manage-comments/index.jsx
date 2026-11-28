import cls from 'classnames';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Header from '../../components/Header.jsx';
import Paginator from '../../components/Paginator.jsx';
import {
  deleteComment,
  getCommentList,
  replyComment,
  updateComment,
} from '../../services/comment.js';
import { buildAvatar, formatDate, getCommentEditDraft, getPostUrl } from './utils.js';

export default function ManageComments() {
  const { t } = useTranslation();
  const keywordRef = useRef(null);
  const replyTextAreaRef = useRef(null);
  const editCommentRef = useRef({});
  const user = useSelector((state) => state.user);
  const [list, setList] = useState({
    page: 1,
    totalPages: 0,
    spamCount: 0,
    waitingCount: 0,
    data: [],
  });
  const [filter, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
    owner: 'all',
    status: 'approved',
    keyword: '',
  });
  const [cmtHandler, setCmtHandler] = useState({});
  const [actDropStatus, setActDropStatus] = useState(false);
  const [commentIds, setCommentIds] = useState([]);

  useEffect(() => {
    if (cmtHandler.action === 'edit' && cmtHandler.draft) {
      editCommentRef.current = cmtHandler.draft;
    }
  }, [cmtHandler]);

  const FILTERS = [
    [
      'owner',
      [
        { type: 'all', name: <Trans i18nKey="all" /> },
        { type: 'mine', name: <Trans i18nKey="mine" /> },
      ],
    ],
    [
      'status',
      [
        { type: 'approved', name: <Trans i18nKey="approved" /> },
        { type: 'waiting', name: <Trans i18nKey="waiting" /> },
        { type: 'spam', name: <Trans i18nKey="spam" /> },
      ],
    ],
  ];

  const refreshComments = () => {
    // Changing the filter object identity re-runs the list effect for the current page.
    dispatch({});
  };

  const updateFilter = (key, type) => {
    setList((current) => (current.page === 1 ? current : { ...current, page: 1 }));
    dispatch({ [key]: type });
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadComments = async () => {
      try {
        const data = await getCommentList({
          page: list.page,
          filter,
          signal: controller.signal,
        });

        setList((current) => ({ ...current, ...data }));
        setCommentIds([]);
      } catch (err) {
        if (err.name !== 'AbortError') {
          // oxlint-disable-next-line no-console
          console.error(err);
        }
      }
    };

    void loadComments();

    return () => controller.abort();
  }, [filter, list.page]);

  const createActions = (comment) =>
    [
      {
        key: 'approved',
        name: t('approved button'),
        show: true,
        disable: comment && comment.status === 'approved',
        async action() {
          if (comment) {
            await updateComment(comment.objectId, { status: 'approved' });
            setList((current) => {
              const data = current.data.filter(({ objectId }) => objectId !== comment.objectId);
              let { waitingCount, spamCount } = current;

              if (comment.status === 'waiting') waitingCount = Math.max(waitingCount - 1, 0);
              if (comment.status === 'spam') spamCount = Math.max(spamCount - 1, 0);

              return { ...current, data, waitingCount, spamCount };
            });
          } else {
            await Promise.all(
              commentIds.map((objectId) => updateComment(objectId, { status: 'approved' })),
            );
            refreshComments();
          }
        },
      },
      {
        key: 'waiting',
        name: t('waiting'),
        show: true,
        disable: comment && comment.status === 'waiting',
        async action() {
          if (comment) {
            await updateComment(comment.objectId, { status: 'waiting' });
            setList((current) => {
              const data = current.data.filter(({ objectId }) => objectId !== comment.objectId);
              const spamCount =
                comment.status === 'spam' ? Math.max(current.spamCount - 1, 0) : current.spamCount;

              return { ...current, data, spamCount, waitingCount: current.waitingCount + 1 };
            });
          } else {
            await Promise.all(
              commentIds.map((objectId) => updateComment(objectId, { status: 'waiting' })),
            );
            refreshComments();
          }
        },
      },
      {
        key: 'spam',
        show: true,
        name: comment ? t('spam') : t('mark as spam'),
        disable: comment && comment.status === 'spam',
        async action() {
          if (comment) {
            await updateComment(comment.objectId, { status: 'spam' });
            setList((current) => ({
              ...current,
              data: current.data.filter(({ objectId }) => objectId !== comment.objectId),
              spamCount: current.spamCount + 1,
            }));
          } else {
            await Promise.all(
              commentIds.map((objectId) => updateComment(objectId, { status: 'spam' })),
            );
            refreshComments();
          }
        },
      },
      {
        key: 'sticky',
        show: comment && !comment.rid && comment.status === 'approved',
        name: comment && comment.sticky ? t('disable sticky') : t('sticky'),
        async action(event) {
          event.preventDefault();

          const sticky = !comment.sticky;

          await updateComment(comment.objectId, { sticky: sticky ? 1 : 0 });
          setList((current) => ({
            ...current,
            data: current.data.map((cmt) =>
              cmt.objectId === comment.objectId ? { ...cmt, sticky } : cmt,
            ),
          }));
        },
      },
      {
        key: 'edit',
        show: comment,
        name: t('edit'),
        action() {
          setCmtHandler({
            id: comment.objectId,
            action: 'edit',
            draft: getCommentEditDraft(comment),
          });
        },
      },
      {
        key: 'reply',
        show: comment && comment.status === 'approved',
        name: t('reply'),
        action() {
          const handler = {};

          if (cmtHandler.id !== comment.objectId && cmtHandler.action !== 'reply') {
            handler.id = comment.objectId;
            handler.action = 'reply';
          }
          setCmtHandler(handler);
        },
      },
      {
        key: 'delete',
        name: t('delete'),
        show: true,
        async action() {
          const text = comment
            ? t('delete one confirm', { nick: comment.nick })
            : t('delete multiple confirm');

          if (!confirm(text)) {
            return;
          }

          if (comment) {
            await deleteComment(comment.objectId);
            setList((current) => ({
              ...current,
              data: current.data.filter(({ objectId }) => objectId !== comment.objectId),
            }));
          } else {
            await Promise.all(commentIds.map((id) => deleteComment(id)));
            refreshComments();
          }
        },
      },
    ].filter(({ show }) => show);

  const cmtReply = async ({ pid, rid, url, at }) => {
    const comment = replyTextAreaRef.current.value;

    if (!comment) {
      return null;
    }

    const { display_name, email, url: link } = user;

    try {
      await replyComment({
        nick: display_name,
        mail: email,
        ua: navigator.userAgent,
        link,
        url,
        comment,
        pid,
        rid: rid ?? pid,
        at,
      });
    } catch {
      alert(t('reply failed'));
      return;
    }

    location.reload();
  };

  const onEditComment = async (idx) => {
    const comment = list.data[idx];
    const draft = { ...editCommentRef.current };
    const updated = await updateComment(comment.objectId, draft);

    setList(({ data, ...rest }) => ({
      ...rest,
      data: data.map((item, index) => (index === idx ? { ...item, ...draft, ...updated } : item)),
    }));
    editCommentRef.current = {};
    setCmtHandler({});
  };

  const allSelected =
    list.data.length > 0 && list.data.every(({ objectId }) => commentIds.includes(objectId));

  return (
    <>
      <Header />
      <div className="main">
        <div className="body container">
          <div className="typecho-page-title">
            <h2>{t('manage comments')}</h2>
          </div>
          <main className="row typecho-page-main">
            <div className="col-mb-12 typecho-list">
              <div className="clear-fix">
                {FILTERS.map(([key, FILTER]) => (
                  <ul
                    key={key}
                    className={cls('typecho-option-tabs', {
                      right: key === 'owner',
                    })}
                  >
                    {FILTER.map(({ type, name }) => (
                      <li className={cls({ current: type === filter[key] })} key={type}>
                        <button type="button" onClick={() => updateFilter(key, type)}>
                          {name}
                          {key === 'status' && type !== 'approved' && list[`${type}Count`] > 0 ? (
                            <span className="balloon">{list[`${type}Count`]}</span>
                          ) : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              <div className="typecho-list-operate clear-fix">
                <form method="get">
                  <div className="operate">
                    <label>
                      <i className="sr-only">{t('select all')}</i>
                      <input
                        type="checkbox"
                        className="typecho-table-select-all"
                        checked={allSelected}
                        onChange={() =>
                          setCommentIds(
                            allSelected ? [] : list.data.map(({ objectId }) => objectId),
                          )
                        }
                      />
                    </label>
                    <div className="btn-group btn-drop">
                      <button
                        className="btn dropdown-toggle btn-s"
                        type="button"
                        onClick={() => setActDropStatus(!actDropStatus)}
                      >
                        <i className="sr-only">{t('action')}</i>
                        {t('selected items')} <i className="i-caret-down" />
                      </button>
                      <ul
                        className="dropdown-menu"
                        role="menu"
                        style={{ display: actDropStatus ? 'block' : 'none' }}
                        onClick={() => setActDropStatus(false)}
                        onKeyDown={() => setActDropStatus(false)}
                      >
                        {createActions().map(({ key, name, action }) => (
                          <li key={key}>
                            <button type="button" onClick={action}>
                              {name}
                            </button>
                          </li>
                        ))}
                      </ul>{' '}
                      {/* {filter.status === 'spam' ? (
                      <button lang="你确认要删除所有垃圾评论吗?" className="btn btn-s btn-warn btn-operate">删除所有垃圾评论</button>
                    ) : null} */}
                    </div>
                  </div>
                  <search className="search">
                    <input
                      type="text"
                      ref={keywordRef}
                      className="text-s"
                      placeholder={t('please input keywords')}
                    />{' '}
                    <button
                      type="submit"
                      className="btn btn-s"
                      onClick={(event) => {
                        event.preventDefault();
                        updateFilter('keyword', keywordRef.current.value);
                      }}
                    >
                      {t('filter')}
                    </button>
                  </search>
                </form>
              </div>

              <form method="post" name="manage_comments" className="operate-form">
                <div className="typecho-table-wrap">
                  <table className="typecho-list-table">
                    <colgroup>
                      <col width="3%" />
                      <col width="6%" />
                      <col width="20%" />
                      <col width="71%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th aria-label={t('select')}> </th>
                        <th aria-label={t('avatar')}> </th>
                        <th>{t('author')}</th>
                        <th>{t('content')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.data.map(
                        (
                          {
                            objectId,
                            nick,
                            mail,
                            avatar,
                            link,
                            comment,
                            ip,
                            addr,
                            url,
                            status,
                            rid,
                            pid,
                            sticky,
                            time,
                            insertedAt,
                            orig,
                          },
                          idx,
                        ) =>
                          cmtHandler.id === objectId && cmtHandler.action === 'edit' ? (
                            <tr className="comment-edit" key={objectId}>
                              <td aria-hidden="true"> </td>
                              {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label */}
                              <td colSpan="2" style={{ verticalAlign: 'top' }}>
                                <div className="comment-edit-info">
                                  <p>
                                    <label htmlFor={`comment-${objectId}-author`}>
                                      {t('username')}
                                    </label>
                                    <input
                                      className="text-s w-100"
                                      id={`comment-${objectId}-author`}
                                      name="author"
                                      type="text"
                                      defaultValue={nick}
                                      onChange={(event) =>
                                        (editCommentRef.current.nick = event.target.value)
                                      }
                                    />
                                  </p>
                                  <p>
                                    <label htmlFor={`comment-${objectId}-mail`}>{t('email')}</label>
                                    <input
                                      className="text-s w-100"
                                      type="email"
                                      name="mail"
                                      id={`comment-${objectId}-mail`}
                                      defaultValue={mail}
                                      onChange={(event) =>
                                        (editCommentRef.current.mail = event.target.value)
                                      }
                                    />
                                  </p>
                                  <p>
                                    <label htmlFor={`comment-${objectId}-url`}>
                                      {t('homepage')}
                                    </label>
                                    <input
                                      className="text-s w-100"
                                      type="text"
                                      name="url"
                                      id={`comment-${objectId}-author`}
                                      defaultValue={link}
                                      onChange={(event) =>
                                        (editCommentRef.current.link = event.target.value)
                                      }
                                    />
                                  </p>
                                </div>
                              </td>
                              {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label */}
                              <td style={{ verticalAlign: 'top' }}>
                                <div className="comment-edit-content">
                                  <p>
                                    <label htmlFor={`comment-${objectId}-text`}>
                                      {t('content')}
                                    </label>
                                    <textarea
                                      name="text"
                                      id={`comment-${objectId}-text`}
                                      rows="6"
                                      className="w-90 mono"
                                      defaultValue={orig ?? comment}
                                      onChange={(event) =>
                                        (editCommentRef.current.comment = event.target.value)
                                      }
                                    />
                                  </p>
                                  <p>
                                    <button
                                      type="button"
                                      className="btn btn-s primary"
                                      onClick={() => onEditComment(idx)}
                                    >
                                      {t('submit')}
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-s cancel"
                                      onClick={() => setCmtHandler({})}
                                    >
                                      {t('cancel')}
                                    </button>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            <tr id={`comment-${objectId}`} key={objectId}>
                              <td style={{ verticalalign: 'top' }}>
                                <input
                                  type="checkbox"
                                  value={objectId}
                                  aria-label={t('select item')}
                                  checked={commentIds.includes(objectId)}
                                  onChange={() =>
                                    setCommentIds(
                                      commentIds.includes(objectId)
                                        ? commentIds.filter((id) => id !== objectId)
                                        : [...commentIds, objectId],
                                    )
                                  }
                                />
                              </td>
                              <td style={{ verticalalign: 'top' }}>
                                <div className="comment-avatar">
                                  <img
                                    className="avatar"
                                    src={buildAvatar(mail, avatar)}
                                    alt={nick}
                                    width="40"
                                    height="40"
                                  />
                                </div>
                              </td>
                              <td style={{ verticalalign: 'top' }} className="comment-head">
                                <div className="comment-meta">
                                  <strong className="comment-author">
                                    {link ? (
                                      <a
                                        href={
                                          link.startsWith('https://') ? link : `https://${link}`
                                        }
                                        rel="external nofollow noreferrer"
                                        target="_blank"
                                      >
                                        {nick}
                                      </a>
                                    ) : (
                                      nick
                                    )}
                                  </strong>
                                  <br />
                                  <span>
                                    <a href={`mailto:${mail}`} target="_blank" rel="noreferrer">
                                      {mail}
                                    </a>
                                  </span>
                                  {mail && <br />}
                                  <span>{ip}</span>
                                  {ip && <br />}
                                  <span>{addr}</span>
                                </div>
                              </td>
                              <td style={{ verticalalign: 'top' }} className="comment-body">
                                <div className="comment-date">
                                  {formatDate(insertedAt ?? time)} {t('at')}{' '}
                                  <a href={getPostUrl(url)} target="_blank" rel="noreferrer">
                                    {url}
                                  </a>
                                </div>
                                <div
                                  className="comment-content"
                                  dangerouslySetInnerHTML={{ __html: comment }}
                                />
                                {cmtHandler.id === objectId && cmtHandler.action === 'reply' ? (
                                  <form className="comment-reply">
                                    <p>
                                      <label htmlFor="text" className="sr-only">
                                        {t('content')}
                                      </label>
                                      <textarea
                                        id="text"
                                        name="text"
                                        className="w-90 mono"
                                        rows="3"
                                        ref={replyTextAreaRef}
                                      />
                                    </p>
                                    <p>
                                      <button
                                        type="button"
                                        className="btn btn-s primary"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          cmtReply({
                                            rid,
                                            pid: objectId,
                                            url,
                                            at: nick,
                                          });
                                        }}
                                      >
                                        {t('reply')}
                                      </button>{' '}
                                      <button
                                        type="button"
                                        className="btn btn-s cancel"
                                        onClick={() => {
                                          editCommentRef.current = {};
                                          setCmtHandler({});
                                        }}
                                      >
                                        {t('cancel')}
                                      </button>
                                    </p>
                                  </form>
                                ) : null}
                                <div className="comment-action hidden-by-mouse">
                                  {createActions({
                                    objectId,
                                    nick,
                                    status,
                                    rid,
                                    pid,
                                    sticky,
                                    mail,
                                    link,
                                    comment,
                                    orig,
                                  }).map(({ key, disable, name, action }) =>
                                    disable ? (
                                      <span className="weak" key={key}>
                                        {name}
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        key={key}
                                        className={`operate-${key}`}
                                        onClick={action}
                                      >
                                        {name}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </td>
                            </tr>
                          ),
                      )}
                    </tbody>
                  </table>
                </div>
              </form>

              <div className="typecho-list-operate clear-fix">
                <form method="get">
                  <Paginator
                    current={list.page}
                    total={list.totalPages}
                    onChange={(page) => setList((current) => ({ ...current, page }))}
                  />
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
