import React, { useState } from 'react';
import cls from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { updateProfile } from '../../services/user';

import { ReactComponent as GithubIcon } from '../../components/icon/github.svg';

export default function() {
  const [isPasswordUpdating, setPasswordUpdating] = useState(false);
  const [isProfileUpdating, setProfileUpdating] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log(user);

  const onProfileUpdate = async function(e) {
    e.preventDefault();
    
    const display_name = e.target.screenName.value;
    const url = e.target.url.value;
    if(!display_name || !url) {
      return alert('昵称和个人主页都是必填字段');
    }

    setProfileUpdating(true);
    await dispatch.user.updateProfile({display_name, url});
    setProfileUpdating(false);
  };

  const onPasswordUpdate = async function(e) {
    e.preventDefault();

    const password = e.target.password.value;
    const confirm = e.target.confirm.value;
    if(!password || !confirm) {
      return alert('请输入密码');
    }

    if(password !== confirm) {
      return alert('两次密码不一致，请重新输入');
    }

    setPasswordUpdating(true);
    await updateProfile({password});
    setPasswordUpdating(false);
  }
  
  const unbind = async function(type) {
    await updateProfile({[type]: ''});
    location.reload();
  }

  let baseUrl = globalThis.serverURL;
  if(!baseUrl) {
    const match = location.pathname.match(/(.*?\/)ui/);
    baseUrl = match ? match[1] : '/';
  }
  const qs = new URLSearchParams(location.search);
  let token = globalThis.TOKEN || sessionStorage.getItem('TOKEN') || qs.get('token');
  if(!token) {
    token = localStorage.getItem('TOKEN');
  }

  return (
    <>
      <Header />
      <div className="main">
        <div className="body container">
          <div className="typecho-page-title">
            <h2>个人设置</h2>
          </div>
          <div className="row typecho-page-main">
            <div className="col-mb-12 col-tb-3">
              <p>
                <a href="http://gravatar.com/emails/" title="在 Gravatar 上修改头像" target="_blank">
                  <img className="profile-avatar" src={user.avatar || `https://gravatar.loli.net/avatar/${user.mailMd5}?s=220&amp;r=X&amp;d=mm`} alt="公子" />
                </a>
              </p>
              <h2>{user.display_name}</h2>
              <p>{user.email}</p>
            </div>

            <div className="col-mb-12 col-tb-6 col-tb-offset-1 typecho-content-panel" role="form">
              <section>
                <h3>个人资料</h3>
                <form method="post" onSubmit={onProfileUpdate}>
                  <ul className="typecho-option">
                    <li>
                      <label className="typecho-label" htmlFor="screenName-0-1">
                        昵称
                      </label>
                      <input id="screenName-0-1" name="screenName" type="text" className="text" defaultValue={user.display_name} />
                      <p className="description"></p>
                    </li>
                  </ul>

                  <ul className="typecho-option">
                    <li>
                      <label className="typecho-label" htmlFor="url-0-2">
                        个人主页地址
                      </label>
                      <input id="url-0-2" name="url" type="text" className="text" defaultValue={user.url} />
                      <p className="description">
                        此用户的个人主页地址, 请用 <code>http://</code> 或 <code>https://</code> 开头.
                      </p>
                    </li>
                  </ul>

                  <ul className="typecho-option typecho-option-submit">
                    <li>
                      <button type="submit" className="btn primary" disabled={isProfileUpdating}>
                        更新我的档案
                      </button>
                    </li>
                  </ul>
                </form>
              </section>
              <br/>
              <section id="socical-account">
                <h3>账号绑定</h3>
                <div className="account-list">
                  <div className={cls('account-item github', {bind: user.github})}>
                    <a 
                      href={user.github ? `https://github.com/${user.github}` : `${baseUrl}oauth/github?state=${token}`}
                      target={user.github ? '_blank' : '_self'}
                    >
                      <GithubIcon />
                    </a>
                    <div className="account-unbind" onClick={_ => unbind('github')}>
                      <svg className="vicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                        <path d="M568.569 512l170.267-170.267c15.556-15.556 15.556-41.012 0-56.569s-41.012-15.556-56.569 0L512 455.431 341.733 285.165c-15.556-15.556-41.012-15.556-56.569 0s-15.556 41.012 0 56.569L455.431 512 285.165 682.267c-15.556 15.556-15.556 41.012 0 56.569 15.556 15.556 41.012 15.556 56.569 0L512 568.569l170.267 170.267c15.556 15.556 41.012 15.556 56.569 0 15.556-15.556 15.556-41.012 0-56.569L568.569 512z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
              <br/>
              <section id="change-password">
                <h3>密码修改</h3>
                <form method="post" onSubmit={onPasswordUpdate}>
                  <ul className="typecho-option">
                    <li>
                      <label className="typecho-label" htmlFor="password-0-11">
                        用户密码
                      </label>
                      <input id="password-0-11" name="password" type="password" className="w-60" autoComplete="new-password" />
                      <p className="description">
                        为此用户分配一个密码.<br />建议使用特殊字符与字母、数字的混编样式,以增加系统安全性.
                      </p>
                    </li>
                  </ul>

                  <ul className="typecho-option">
                    <li>
                      <label className="typecho-label" htmlFor="confirm-0-12">
                        用户密码确认
                      </label>
                      <input id="confirm-0-12" name="confirm" type="password" className="w-60" autoComplete="new-password" />
                      <p className="description">
                        请确认你的密码, 与上面输入的密码保持一致.
                      </p>
                    </li>
                  </ul>
                  <ul className="typecho-option typecho-option-submit">
                    <li>
                      <button type="submit" className="btn primary" disabled={isPasswordUpdating}>
                        更新密码
                      </button>
                    </li>
                  </ul>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}