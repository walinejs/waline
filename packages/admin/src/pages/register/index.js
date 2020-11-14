import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

export default function() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [error, setError] = useState(false);
  useEffect(() => {
    if(user && user.email) {
      navigate('/ui', {replace: true});
    }
  }, []);

  const onSubmit = async function(e) {
    e.preventDefault();
    setError(false);

    const nick = e.target.nick.value;
    if(!nick || nick.length < 2) {
      return setError('请输入正确的昵称');
    }
    const email = e.target.email.value;
    if(!email) {
      return setError('请输入邮箱');
    }
    const link = e.target.link.value;
    const password = e.target.password.value;
    const passwordAgain = e.target['password-again'].value;
    if(!password || !passwordAgain || passwordAgain !== password) {
      return setError('两次密码不一致');
    }

    try {
      await dispatch.user.register({display_name: nick, email, url: link, password});
      navigate('/ui/login', {replace: true});
    } catch(e) {
      setError('注册失败，请稍后再试！');
    }
  };

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
        <form method="post" name="login" role="form" onSubmit={onSubmit}>
          <p>
            <label htmlhtmlFor="nick" className="sr-only">昵称</label>
            <input type="text" id="nick" name="nick" placeholder="昵称" className="text-l w-100" />
          </p>
          <p>
            <label htmlhtmlFor="email" className="sr-only">邮箱</label>
            <input type="text" id="email" name="email" placeholder="邮箱" className="text-l w-100" />
          </p>
          <p>
            <label htmlhtmlFor="link" className="sr-only">个人网站</label>
            <input type="text" id="link" name="link" placeholder="个人网站" className="text-l w-100" />
          </p>
          <p>
            <label htmlhtmlFor="password" className="sr-only">密码</label>
            <input type="password" id="password" name="password" className="text-l w-100" placeholder="密码" />
          </p>
          <p>
            <label htmlhtmlFor="password-again" className="sr-only">再次输入密码</label>
            <input type="password" id="password-again" name="password-again" className="text-l w-100" placeholder="密码" />
          </p>
          <p className="submit">
            <button type="submit" className="btn btn-l w-100 primary">注册</button>
          </p>
        </form>

        <p className="more-link">
          <Link to="/ui">返回首页</Link> • <Link to="/ui/login">用户登录</Link>
        </p>
      </div>
    </div>
    </>
  )
}