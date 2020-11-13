import React from 'react';

export default function() {
  return (
    <div className="typecho-head-nav clearfix" role="navigation">
      <nav id="typecho-nav-list">
        <ul className="root focus">
          <li className="parent">
            <a href="https://old.imnerd.org/admin/index.php">控制台</a>
          </li>
          <ul className="child">
            <li className="focus">
              <a href="https://old.imnerd.org/admin/">概要</a>
            </li>
            <li><a href="https://old.imnerd.org/admin/profile.php">个人设置</a></li>
            <li><a href="https://old.imnerd.org/admin/plugins.php">插件</a></li>
            <li><a href="https://old.imnerd.org/admin/themes.php">外观</a></li>
            <li className="last"><a href="https://old.imnerd.org/admin/extending.php?panel=Export2Valine%2Fpanel.php">评论导出</a></li>
          </ul>
        </ul>

        <ul className="root">
          <li className="parent"><a href="https://old.imnerd.org/admin/write-post.php">撰写</a></li>
          <ul className="child">
            <li><a href="https://old.imnerd.org/admin/write-post.php">撰写文章</a></li>
            <li className="last"><a href="https://old.imnerd.org/admin/write-page.php">创建页面</a></li>
          </ul>
        </ul>

        <ul className="root">
          <li className="parent"><a href="https://old.imnerd.org/admin/manage-posts.php">管理</a></li>
          <ul className="child">
            <li><a href="https://old.imnerd.org/admin/manage-posts.php">文章</a></li>
            <li><a href="https://old.imnerd.org/admin/manage-pages.php">独立页面</a></li>
            <li><a href="https://old.imnerd.org/admin/manage-comments.php">评论</a></li>
            <li><a href="https://old.imnerd.org/admin/manage-categories.php">分类</a></li>
            <li><a href="https://old.imnerd.org/admin/manage-tags.php">标签</a></li>
            <li><a href="https://old.imnerd.org/admin/manage-medias.php">文件</a></li>
            <li><a href="https://old.imnerd.org/admin/manage-users.php">用户</a></li>
            <li className="last"><a href="https://old.imnerd.org/admin/extending.php?panel=Links%2Fmanage-links.php">友情链接</a></li>
          </ul>
        </ul>
        
        <ul className="root">
          <li className="parent"><a href="https://old.imnerd.org/admin/options-general.php">设置</a></li>
          <ul className="child">
            <li><a href="https://old.imnerd.org/admin/options-general.php">基本</a></li>
            <li><a href="https://old.imnerd.org/admin/options-discussion.php">评论</a></li>
            <li><a href="https://old.imnerd.org/admin/options-reading.php">阅读</a></li>
            <li className="last"><a href="https://old.imnerd.org/admin/options-permalink.php">永久链接</a></li>
          </ul>
        </ul>    
      </nav>
      <div className="operate">
        <a title="最后登录: 42分钟前" href="https://old.imnerd.org/admin/profile.php" className="author">公子</a>
        <a className="exit" href="https://old.imnerd.org/action/logout">登出</a>
        <a href="https://old.imnerd.org/" target="_blank">网站</a>
      </div>
  </div>
  )
}