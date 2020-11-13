import React from 'react';

export default function() {
  return (
    <>
    <div className="message popup notice" style={{position: 'fixed', top: 0, display: 'block'}}>
      <ul><li>请输入用户名</li><li>请输入密码</li></ul>
    </div>
    <div className="typecho-login-wrap">
      <div className="typecho-login">
        <h1><a href="http://typecho.org" className="i-logo">Waline</a></h1>
        <form action="https://old.imnerd.org/index.php/action/login?_=10b9216eaf53f03efd5c45707428a806" method="post" name="login" role="form">
          <p>
            <label for="name" className="sr-only">用户名</label>
            <input type="text" id="name" name="name" value="" placeholder="用户名" className="text-l w-100" autofocus="" />
          </p>
          <p>
            <label for="password" className="sr-only">密码</label>
            <input type="password" id="password" name="password" className="text-l w-100" placeholder="密码" />
          </p>
          <p className="submit">
            <button type="submit" className="btn btn-l w-100 primary">登录</button>
            <input type="hidden" name="referer" value="https://old.imnerd.org/admin/" />
          </p>
          <p>
            <label for="remember"><input type="checkbox" name="remember" className="checkbox" value="1" id="remember"/> 下次自动登录</label>
          </p>
        </form>
        <p className="more-link">
          <a href="https://old.imnerd.org/">返回首页</a> • <a href="https://old.imnerd.org/admin/register.php">用户注册</a>
        </p>
      </div>
    </div>
    </>
  )
}