import React from 'react';
import Header from '../../components/Header';

export default function() {
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
              <ul className="typecho-option-tabs right">
                <li className=" current"><a href="https://old.imnerd.org/admin/manage-comments.php?__typecho_all_comments=on">所有</a></li>
                <li className=""><a href="https://old.imnerd.org/admin/manage-comments.php?__typecho_all_comments=off">我的</a></li>
              </ul>
              <ul className="typecho-option-tabs">
                <li className="current"><a href="https://old.imnerd.org/admin/manage-comments.php">已通过</a></li>
                <li><a href="https://old.imnerd.org/admin/manage-comments.php?status=waiting">待审核</a></li>
                <li><a href="https://old.imnerd.org/admin/manage-comments.php?status=spam">垃圾</a></li>
              </ul>
            </div>
            
            <div className="typecho-list-operate clearfix">
              <form method="get">
                <div className="operate">
                  <label><i className="sr-only">全选</i><input type="checkbox" className="typecho-table-select-all" /></label>
                  <div className="btn-group btn-drop">
                    <button className="btn dropdown-toggle btn-s" type="button"><i className="sr-only">操作</i>选中项 <i className="i-caret-down"></i></button>
                    <ul className="dropdown-menu">
                      <li><a href="https://old.imnerd.org/action/comments-edit?do=approved&amp;_=52665fb5f55e690d55b0ca64a4812709">通过</a></li>
                      <li><a href="https://old.imnerd.org/action/comments-edit?do=waiting&amp;_=52665fb5f55e690d55b0ca64a4812709">待审核</a></li>
                      <li><a href="https://old.imnerd.org/action/comments-edit?do=spam&amp;_=52665fb5f55e690d55b0ca64a4812709">标记垃圾</a></li>
                      <li><a lang="你确认要删除这些评论吗?" href="https://old.imnerd.org/action/comments-edit?do=delete&amp;_=52665fb5f55e690d55b0ca64a4812709">删除</a></li>
                    </ul>
                  </div>
                </div>

                <div className="search" role="search">
                  <input type="text" className="text-s" placeholder="请输入关键字" value="" onclick="value='';name='keywords';" />
                  <button type="submit" className="btn btn-s">筛选</button>
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
                    <tr id="comment-1517114">
                      <td valign="top">
                        <input type="checkbox" value="1517114" name="coid[]" />
                      </td>
                      <td valign="top">
                        <div className="comment-avatar">
                          <img className="avatar" src="https://secure.gravatar.com/avatar/32f210c5e3cd76fdf677981974274dfd?s=40&amp;r=G&amp;d=" alt="公子" width="40" height="40" />
                        </div>
                      </td>
                      <td valign="top" className="comment-head">
                        <div className="comment-meta">
                          <strong className="comment-author">
                            <a href="http://imnerd.org" rel="external nofollow" target="_blank">公子</a>
                          </strong>
                          <br/>
                          <span><a href="mailto:i@imnerd.org" target="_blank">i@imnerd.org</a></span>
                          <br/>
                          <span>104.192.108.10</span>
                        </div>
                      </td>
                      <td valign="top" className="comment-body">
                        <div className="comment-date">3月12日 于 <a href="https://old.imnerd.org/guestbook.html/comment-page-14#comment-1517114" target="_blank">留言簿</a></div>
                        <div className="comment-content">
                            <p>@<a href="#comment-1517112"> JoyNop </a> 恩，当时移植主题的时候的老问题了，一直懒得修，我有空弄一下吧，谢谢反馈~</p>
                        </div> 
                        <div className="comment-action hidden-by-mouse">
                          <span className="weak">通过</span>
                          <a href="https://old.imnerd.org/action/comments-edit?do=waiting&amp;coid=1517114&amp;_=52665fb5f55e690d55b0ca64a4812709" className="operate-waiting">待审核</a>
                          <a href="https://old.imnerd.org/action/comments-edit?do=spam&amp;coid=1517114&amp;_=52665fb5f55e690d55b0ca64a4812709" className="operate-spam">垃圾</a>
                          <a href="#comment-1517114" rel="https://old.imnerd.org/action/comments-edit?do=edit&amp;coid=1517114&amp;_=52665fb5f55e690d55b0ca64a4812709" className="operate-edit">编辑</a>
                          <a href="#comment-1517114" rel="https://old.imnerd.org/action/comments-edit?do=reply&amp;coid=1517114&amp;_=52665fb5f55e690d55b0ca64a4812709" className="operate-reply">回复</a>                                     
                          <a lang="你确认要删除公子的评论吗?" href="https://old.imnerd.org/action/comments-edit?do=delete&amp;coid=1517114&amp;_=52665fb5f55e690d55b0ca64a4812709" className="operate-delete">删除</a>
                        </div>
                      </td>
                    </tr>
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
                        <li><a href="https://old.imnerd.org/action/comments-edit?do=approved&amp;_=52665fb5f55e690d55b0ca64a4812709">通过</a></li>
                        <li><a href="https://old.imnerd.org/action/comments-edit?do=waiting&amp;_=52665fb5f55e690d55b0ca64a4812709">待审核</a></li>
                        <li><a href="https://old.imnerd.org/action/comments-edit?do=spam&amp;_=52665fb5f55e690d55b0ca64a4812709">标记垃圾</a></li>
                        <li><a lang="你确认要删除这些评论吗?" href="https://old.imnerd.org/action/comments-edit?do=delete&amp;_=52665fb5f55e690d55b0ca64a4812709">删除</a></li>
                    </ul>
                  </div>
                </div>
                <ul className="typecho-pager">
                  <li className="current"><a href="https://old.imnerd.org/admin/manage-comments.php?page=1">1</a></li><li><a href="https://old.imnerd.org/admin/manage-comments.php?page=2">2</a></li><li><a href="https://old.imnerd.org/admin/manage-comments.php?page=3">3</a></li><li><a href="https://old.imnerd.org/admin/manage-comments.php?page=4">4</a></li><li><span>...</span></li><li><a href="https://old.imnerd.org/admin/manage-comments.php?page=240">240</a></li><li className="next"><a href="https://old.imnerd.org/admin/manage-comments.php?page=2">»</a></li>                        
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}