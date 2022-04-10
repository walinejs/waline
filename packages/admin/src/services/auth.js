import request from '../utils/request';

export async function getUserInfo() {
  return request('token').catch(() => {
    logout();
    Promise.reject(new Error('get userinfo failed'));
  });
}

export async function login({ email, password, code }) {
  return request({
    url: 'token',
    method: 'POST',
    body: { email, password, code },
  });
}

export async function logout() {
  window.TOKEN = null;
  sessionStorage.removeItem('TOKEN');
  localStorage.removeItem('TOKEN');
}

export async function register(user) {
  return request({ url: 'user', method: 'POST', body: user });
}

export async function forgot({ email }) {
  return request({
    url: 'user/password',
    method: 'PUT',
    body: { email },
  });
}
