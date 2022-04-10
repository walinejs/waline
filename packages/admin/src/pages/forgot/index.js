import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header';

export default function () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      navigate('/ui', { replace: true });
    }
  }, [navigate]);

  const onSubmit = async function (e) {
    e.preventDefault();
    setError(false);

    const email = e.target.email.value;
    if (!email) {
      return setError(t('please input email'));
    }

    try {
      setSubmitting(true);
      await dispatch.user.forgot({
        email,
      });
      alert(t('find password success! please go to your mailbox to reset it!'));
      navigate('/ui/login');
    } catch (e) {
      setError(t('find password error! try again later'));
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
            <ul className="typecho-option">
              <li>
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
                <p className="description" style={{ textAlign: 'left' }}>
                  {t(
                    'you will receive an email which contains a link to create new password'
                  )}
                </p>
              </li>
            </ul>
            <p className="submit">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-l w-100 primary"
              >
                {t('get new password')}
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
