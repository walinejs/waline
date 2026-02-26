import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

import Header from '../../components/Header.jsx';
import CaptchaProviders from '../../components/Captcha.js';
import getCaptchaConfig from '../../utils/getCaptchaConfig.js';

// oxlint-disable-next-line max-lines-per-function
export default function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const captchaRef = useRef(null);

  const captchaConfig = getCaptchaConfig();

  useEffect(() => {
    if (user && user.objectId) {
      navigate('/ui', { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    const nick = event.target.nick.value;

    if (!nick || nick.length < 2) {
      return setError(t('nickname illegal'));
    }
    const email = event.target.email.value;

    if (!email) {
      return setError(t('please input email'));
    }
    const link = event.target.link.value;
    const password = event.target.password.value;
    const passwordAgain = event.target['password-again'].value;

    if (!password || !passwordAgain || passwordAgain !== password) {
      return setError(t("passwords don't match"));
    }

    try {
      setSubmitting(true);
      await captchaRef.current?.execute?.();
      const captchaToken = captchaRef.current.getResponse();
      const resp = await dispatch.user.register({
        display_name: nick,
        email,
        url: link,
        password,
        captcha: captchaToken,
      });

      if (resp && resp.verify) {
        alert(t('register success! please go to your mailbox to verify it!'));
      }
      navigate('/ui/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div
        className="message popup notice"
        style={{
          position: 'fixed',
          top: 0,
          display: error ? 'block' : 'none',
        }}
      >
        <ul>{error ? <li>{error}</li> : null}</ul>
      </div>
      <div className="typecho-login-wrap">
        <div className="typecho-login">
          <form method="post" name="login" role="form" onSubmit={onSubmit}>
            <p>
              <label htmlFor="nick" className="sr-only">
                {t('nickname')}
              </label>
              <input
                type="text"
                id="nick"
                name="nick"
                placeholder={t('nickname')}
                className="text-l w-100"
              />
            </p>
            <p>
              <label htmlFor="email" className="sr-only">
                {t('email')}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder={t('email')}
                className="text-l w-100"
              />
            </p>
            <p>
              <label htmlFor="link" className="sr-only">
                {t('website')}
              </label>
              <input
                type="text"
                id="link"
                name="link"
                placeholder={t('website')}
                className="text-l w-100"
              />
            </p>
            <p>
              <label htmlFor="password" className="sr-only">
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="text-l w-100"
                placeholder={t('password')}
              />
            </p>
            <p>
              <label htmlFor="password-again" className="sr-only">
                {t('password again')}
              </label>
              <input
                type="password"
                id="password-again"
                name="password-again"
                className="text-l w-100"
                placeholder={t('password again')}
              />
            </p>

            {captchaConfig?.provider &&
              React.createElement(CaptchaProviders[captchaConfig.provider], {
                ...captchaConfig,
                ref: captchaRef,
              })}

            <p className="submit">
              <button type="submit" disabled={submitting} className="btn btn-l w-100 primary">
                {t('register')}
              </button>
            </p>
          </form>

          <p className="more-link">
            <Link to="/ui">{t('back to home')}</Link> •{' '}
            <Link to="/ui/login">{t('register.login')}</Link>
          </p>
        </div>
      </div>
    </>
  );
}
