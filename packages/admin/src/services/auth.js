import request from '../utils/request.js';

export const getUserInfo = () =>
  request('token').catch(() => {
    logout();
    Promise.reject(new Error('get userinfo failed'));
  });

export const login = ({ email, password, code, recaptchaV3, turnstile }) =>
  request({
    url: 'token',
    method: 'POST',
    body: { email, password, code, recaptchaV3, turnstile },
  });

export const logout = () => {
  window.TOKEN = null;
  sessionStorage.removeItem('TOKEN');
  localStorage.removeItem('TOKEN');
};

export const register = (user) => request({ url: 'user', method: 'POST', body: user });

export const forgot = ({ email }) =>
  request({
    url: 'user/password',
    method: 'PUT',
    body: { email },
  });
