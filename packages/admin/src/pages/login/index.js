import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import * as Icons from '../../components/icon';

export default function() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [error, setError] = useState(false);
  useEffect(() => {
    if(user && user.email) {
      const query = new URLSearchParams(location.search);
      const redirect = query.get('redirect') || (user.type !== 'administrator' ? 'ui/profile' : 'ui');

      const match = location.pathname.match(/(.*?)\/ui/);
      const basepath = match ? match[1] : '/';
      navigate(basepath + redirect, {replace: true});
    }
  }, [user]);

  const onSubmit = async function(e) {
    e.preventDefault();
    setError(false);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const remember = e.target.remember.checked;
    if(!email) {
      return setError('请输入邮箱');
    }
    if(!password) {
      return setError('请输入密码');
    }

    try {
      await dispatch.user.login({email, password, remember});
      navigate('/ui', {replace: true});
    } catch(e) {
      setError('账号密码错误');
    }
  };

  let baseUrl = globalThis.serverURL;
  if(!baseUrl) {
    const match = location.pathname.match(/(.*?\/)ui/);
    baseUrl = match ? match[1] : '/';
  }

  return (
    <>
    <div 
      className="message popup notice" 
      style={{
        position: 'fixed', 
        top: 0, 
        display: error ? 'block' : 'none'
      }}
    >
      <ul>
        {error ? <li>{error}</li> : null}
      </ul>
    </div>
    <div className="typecho-login-wrap">
      <div className="typecho-login">
        {/* <h1><a href="http://waline.js.org" className="i-logo">Waline</a></h1> */}
        <form method="post" name="login" role="form" onSubmit={onSubmit}>
          <p>
            <label htmlFor="email" className="sr-only">邮箱</label>
            <input type="text" id="email" name="email" placeholder="邮箱" className="text-l w-100" />
          </p>
          <p>
            <label htmlFor="password" className="sr-only">密码</label>
            <input type="password" id="password" name="password" className="text-l w-100" placeholder="密码" />
          </p>
          <p className="submit">
            <button type="submit" className="btn btn-l w-100 primary">登录</button>
          </p>
          <p>
            <label htmlFor="remember">
              <input type="checkbox" name="remember" className="checkbox" id="remember"/> 下次自动登录
            </label>
          </p>
        </form>
        <div className="social-accounts">
          {(globalThis.ALLOW_SOCIALS || []).map(social => (
            <a key={social} href={`${baseUrl}oauth/${social}`}>{React.createElement(Icons[social])}</a>
          ))}
        </div>

        <p className="more-link">
          <Link to="/ui">返回首页</Link> • <Link to="/ui/register">用户注册</Link>
        </p>
      </div>
    </div>
    </>
  )
}