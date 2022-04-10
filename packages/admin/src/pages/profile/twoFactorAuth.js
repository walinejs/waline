import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import { useEffect } from 'react';
import { gen2FAToken, get2FAToken, updateProfile } from '../../services/user';
import { useSelector } from 'react-redux';

export default function () {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [updating, setUpdating] = useState(false);
  const [data, setData] = useState({ otpauth_url: '', secret: '' });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    get2FAToken().then(setData);
  }, []);

  const on2faUpdate = async (e) => {
    e.preventDefault();

    const code = e.target.code.value;
    if (!code || code.length < 6) {
      return alert(t('minimum 6 characters required'));
    }

    setUpdating(true);
    await gen2FAToken({ code, secret: data.secret });
    setUpdating(false);
    location.reload();
  };

  const close2FA = async () => {
    if (!confirm(t('close 2fa confirm'))) {
      return;
    }

    setUpdating(true);
    await updateProfile({ ['2fa']: '' }).catch((reason) => {
      alert(reason);
      console.error(reason);
    });
    setUpdating(false);
    location.reload();
  };

  return (
    <section id="two-factor-auth">
      <h3>{t('two factor auth')}</h3>
      {user['2fa'] ? (
        <div>
          <p>{t('enable 2fa')}</p>
          <QRCode value={data.otpauth_url} size={256} />
          <br />
          <br />
          <button
            className="btn primary"
            htmlType="submit"
            onClick={close2FA}
            disabled={updating}
          >
            {t('disable 2fa')}
          </button>
        </div>
      ) : null}
      {!user['2fa'] && step === 1 && (
        <div>
          <p>{t('2fa description 1')}</p>
          <p>{t('2fa description 2')}</p>
          <button className="btn primary" onClick={() => setStep(2)}>
            {t('next step')}
          </button>
        </div>
      )}
      {!user['2fa'] && step === 2 && (
        <div>
          <h4>{t('download 2fa app')}</h4>
          <ul className="step2-apps">
            <li>
              For Android, iOS:
              <a href="https://support.google.com/accounts/answer/1066447?hl=en">
                {' '}
                Google Authenticator
              </a>
            </li>
            <li>
              For Android and iOS:
              <a href="http://guide.duosecurity.com/third-party-accounts">
                {' '}
                Duo Mobile
              </a>
            </li>
            <li>
              For Windows Phone:
              <a href="https://www.microsoft.com/en-US/store/apps/Authenticator/9WZDNCRFJ3RJ">
                {' '}
                Authenticator
              </a>
            </li>
          </ul>
          <button
            className="btn primary"
            htmlType="submit"
            onClick={() => setStep(3)}
          >
            {t('next step')}
          </button>
        </div>
      )}
      {!user['2fa'] && step === 3 && (
        <div>
          <p>{t('open app and scan qrcode')}</p>
          <QRCode value={data.otpauth_url} size={256} />
          <form method="post" onSubmit={on2faUpdate}>
            <ul className="typecho-option">
              <li>
                <label className="typecho-label" htmlFor="code-0-1">
                  {t('input 2fa code')}
                </label>
                <input id="code-0-1" name="code" type="text" className="text" />
                <p className="description"></p>
              </li>
            </ul>
            <ul className="typecho-option typecho-option-submit">
              <li>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={updating}
                >
                  {t('enable 2fa')}
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </section>
  );
}
