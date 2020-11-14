import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from 'classnames';
import md5 from 'md5';

import Header from '../../components/Header';
import { deleteComment, getCommentList, replyComment, updateComment } from '../../services/comment';
import Paginator from '../../components/Paginator';
const FILTERS = [
  [
    'owner',
    [
      { type: 'all', name: '所有' },
      { type: 'mine', name: '我的' }
    ]
  ],
  [
    'status',
    [
      { type: 'approved', name: '已通过' },
      { type: 'spam', name: '垃圾' }
    ]
  ]
];

function buildAvatar(email) {
  return `https://gravatar.loli.net/avatar/${md5(email)}?s=40&r=G&d=`;
}

export default function() {
  const keywordRef = useRef(null);
  const replyTextAreaRef = useRef(null);
  const editCommentRef = useRef({});
  const user = useSelector(state => state.user);
  const [list, setList] = useState({page: 1, totalPages: 0, spamCount: 0, data: []});
  const [filter, dispatch] = useReducer(function(state, action) {
    return {...state, ...action};
  }, {owner: 'all', status: 'approved', keyword: ''});
  const [cmtHandler, setCmtHandler] = useState({});

  useEffect(() => {
    getCommentList({page: list.page, filter}).then(data => setList({...list, ...data}));
  }, [filter, list.page]);

  const createActions = comment => ([
    {
      key: 'approved',
      name: '通过',
      show: true,
      disable: comment && comment.status === 'approved',
      async action() {
        if(comment) {
          await updateComment(comment.objectId, {status: 'approved'});
          list.data = list.data.filter(({objectId}) => objectId !== comment.objectId);
          list.spamCount -= 1;
          setList({...list});
        }
      }
    },
    {
      key: 'spam',
      show: true,
      name: comment ? '垃圾' : '标记垃圾',
      disable: comment && comment.status === 'spam',
      async action() {
        if(comment) {
          await updateComment(comment.objectId, {status: 'spam'});
          list.data = list.data.filter(({objectId}) => objectId !== comment.objectId);
          list.spamCount += 1;
          setList({...list});
        }
      }
    },
    {
      key: 'edit',
      show: comment,
      name: '编辑',
      action() {
        const handler = {};
        if(cmtHandler.id !== comment.objectId && cmtHandler.action !== 'edit') {
          handler.id = comment.objectId;
          handler.action = 'edit';
        }
        setCmtHandler(handler);
      }
    },
    {
      key: 'reply',
      show: comment && comment.status !== 'spam',
      name: '回复',
      action() {
        const handler = {};
        if(cmtHandler.id !== comment.objectId && cmtHandler.action !== 'reply') {
          handler.id = comment.objectId;
          handler.action = 'reply';
        }
        setCmtHandler(handler);
      }
    },
    {
      key: 'delete',
      name: '删除',
      show: true,
      async action() {
        const text = comment ? `你确认要删除${comment.nick}的评论吗？` : `你确认要删除这些评论吗？`;
        if(!confirm(text)) {
          return;
        }
        await deleteComment(comment.objectId);
        list.data = list.data.filter(({objectId}) => objectId !== comment.objectId);
        setList({...list});
      }
    }
  ].filter(({show}) => show));

  const cmtReply = async ({pid, rid, url, at}) => {
    const comment = replyTextAreaRef.current.value;
    if(!comment) {
      return null;
    }
    const {display_name, email, url: link} = user;
    await replyComment({
      nick: display_name, 
      mail: email, 
      ua: navigator.userAgent,
      link, url, comment, pid, rid: rid || pid, at
    });
    location.reload();
    // setCmtHandler({});
    // setList({page: 1, totalPages: list.totalPages, spamCount: list.spamCount, data: []});
  }

  const onEditComment = async idx => {
    const comment = list.data[idx];
    await updateComment(comment.objectId, editCommentRef.current);
    list.data[idx] = {...comment, ...editCommentRef.current};
    setList({...list});
    setCmtHandler({});
  }

  return (
    <>
    <Header />
    <div className="main">
      <div className="body container">
        <div className="typecho-page-title">
          <h2>管理评论</h2>
        </div>
        <div className="row typecho-page-main" role="main">
          <div className="col-mb-12 typecho-list">
            <div className="clearfix">
              {FILTERS.map(([key, FILTER]) => (
                <ul 
                  key={key}
                  className={cls('typecho-option-tabs', {right: key === 'owner'})}
                >
                  {FILTER.map(({type, name}) => (
                    <li className={cls({current: type === filter[key]})} key={type}>
                      <a 
                        href="javascript:void(0)" 
                        onClick={_ => dispatch({[key]: type})}
                      >
                        {name}
                        {key === 'status' && type === 'spam' && list.spamCount > 0 ? (<span className="balloon">{list.spamCount}</span>) : null}  
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            
            <div className="typecho-list-operate clearfix">
              <form method="get">
                <div className="operate">
                  <label>
                    <i className="sr-only">全选</i>
                    <input type="checkbox" className="typecho-table-select-all" />
                  </label>
                  <div className="btn-group btn-drop">
                    <button className="btn dropdown-toggle btn-s" type="button"><i className="sr-only">操作</i>选中项 <i className="i-caret-down"></i></button>
                    <ul className="dropdown-menu">
                      {createActions().map(({key, name, action}) => 
                        <li key={key}><a href="javascript:void(0)" onClick={action}>{name}</a></li>
                      )}
                    </ul>
                    {filter.status === 'spam' ? (
                      <button lang="你确认要删除所有垃圾评论吗?" className="btn btn-s btn-warn btn-operate">删除所有垃圾评论</button>
                    ) : null}
                  </div>
                </div>

                <div className="search" role="search">
                  <input 
                    type="text" 
                    ref={keywordRef}
                    className="text-s" 
                    placeholder="请输入关键字"
                  />
                  <button 
                    type="submit" 
                    className="btn btn-s"
                    onClick={e => e.preventDefault() && dispatch({keyword: keywordRef.current.value})}  
                  >筛选</button>
                </div>
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
                      <th> </th>
                      <th>作者</th>
                      <th> </th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.data.map(({objectId, nick, mail, link, comment, ip, url, status, rid, pid, insertedAt}, idx) => 
                      cmtHandler.id === objectId && cmtHandler.action === 'edit' ? (
                        <tr className="comment-edit" key={objectId}>
                          <td> </td>
                          <td colSpan="2" valign="top">
                            <div className="comment-edit-info">
                              <p>
                                <label htmlFor={`comment-${objectId}-author`}>用户名</label>
                                <input 
                                  className="text-s w-100" 
                                  id={`comment-${objectId}-author`} 
                                  name="author" 
                                  type="text" 
                                  defaultValue={nick}  
                                  onChange={e => (editCommentRef.current.nick = e.target.value)}
                                />
                              </p>
                              <p>
                                <label htmlFor={`comment-${objectId}-mail`}>电子邮箱</label>
                                <input 
                                  className="text-s w-100" 
                                  type="email" 
                                  name="mail" 
                                  id={`comment-${objectId}-mail`} 
                                  defaultValue={mail}  
                                  onChange={e => (editCommentRef.current.mail = e.target.value)}
                                />
                              </p>
                              <p>
                                <label htmlFor={`comment-${objectId}-url`}>个人主页</label>
                                <input 
                                  className="text-s w-100" 
                                  type="text" 
                                  name="url" 
                                  id={`comment-${objectId}-author`} 
                                  defaultValue={link}  
                                  onChange={e => (editCommentRef.current.link = e.target.value)}
                                />
                              </p>
                            </div>
                          </td>
                          <td valign="top">
                            <div className="comment-edit-content">
                              <p>
                                <label htmlFor={`comment-${objectId}-text`}>内容</label>
                                <textarea 
                                  name="text" 
                                  id={`comment-${objectId}-text`} 
                                  rows="6" 
                                  className="w-90 mono"
                                  defaultValue={comment}
                                  onChange={e => (editCommentRef.current.comment = e.target.value)}
                                />
                              </p>
                              <p>
                                <button 
                                  type="button" 
                                  className="btn btn-s primary"
                                  onClick={_ => onEditComment(idx)}  
                                >提交</button> 
                                <button 
                                  type="button" 
                                  className="btn btn-s cancel"
                                  onClick={_ => setCmtHandler({})}  
                                >取消</button>
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr id={`comment-${objectId}`} key={objectId}>
                          <td valign="top">
                            <input type="checkbox" value={objectId} />
                          </td>
                          <td valign="top">
                            <div className="comment-avatar">
                              <img className="avatar" src={buildAvatar(mail)} alt={nick} width="40" height="40" />
                            </div>
                          </td>
                          <td valign="top" className="comment-head">
                            <div className="comment-meta">
                              <strong className="comment-author">
                                <a href={link} rel="external nofollow" target="_blank">{nick}</a>
                              </strong>
                              <br/>
                              <span><a href={`mailto:${mail}`} target="_blank">{mail}</a></span>
                              <br/>
                              <span>{ip}</span>
                            </div>
                          </td>
                          <td valign="top" className="comment-body">
                            <div className="comment-date">{insertedAt} 于 <a href={url} target="_blank">{url}</a></div>
                            <div className="comment-content" dangerouslySetInnerHTML={{__html: comment}}></div> 
                            {cmtHandler.id === objectId && cmtHandler.action === 'reply' ? (
                              <form className="comment-reply">
                                <p>
                                  <label htmlFor="text" className="sr-only">内容</label>
                                  <textarea 
                                    id="text" 
                                    name="text" 
                                    className="w-90 mono" 
                                    rows="3"
                                    ref={replyTextAreaRef}  
                                  ></textarea>
                                </p>
                                <p>
                                  <button 
                                    type="button"
                                    className="btn btn-s primary"
                                    onClick={e => {
                                      e.preventDefault();
                                      cmtReply({rid, pid: objectId, url, at: nick})
                                    }}
                                  >回复</button> 
                                  <button 
                                    type="button" 
                                    className="btn btn-s cancel"
                                    onClick={_ => setCmtHandler({})}  
                                  >取消</button>
                                </p>
                              </form>
                            ) : null}
                            <div className="comment-action hidden-by-mouse">
                              {createActions({objectId, nick, status, rid, pid}).map(({key, disable, name, action}) => (
                                disable ? (
                                  <span className="weak" key={key}>{name}</span>
                                ) : (
                                  <a key={key} href="javascript:void(0)" className={`operate-${key}`} onClick={action}>{name}</a>
                                )
                              ))}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </form>

            <div className="typecho-list-operate clearfix">
              <form method="get">
                <div className="operate">
                  <label><i className="sr-only">全选</i><input type="checkbox" className="typecho-table-select-all" /></label>
                  <div className="btn-group btn-drop">
                    <button className="btn dropdown-toggle btn-s" type="button"><i className="sr-only">操作</i>选中项 <i className="i-caret-down"></i></button>
                    <ul className="dropdown-menu">
                      {createActions().map(({key, name, action}) => 
                        <li key={key}><a href="javascript:void(0)" onClick={action}>{name}</a></li>
                      )}
                    </ul>
                    {filter.status === 'spam' ? (
                      <button lang="你确认要删除所有垃圾评论吗?" className="btn btn-s btn-warn btn-operate">删除所有垃圾评论</button>
                    ) : null}
                  </div>
                </div>
                <Paginator 
                  current={list.page} 
                  total={list.totalPages} 
                  onChange={page => setList({...list, page})} 
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}