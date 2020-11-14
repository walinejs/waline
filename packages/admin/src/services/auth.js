import request from '../utils/request';

export async function getUserInfo() {
  return request('token').catch(_ => Promise.reject(new Error('获取用户信息失败')))
}

export async function login({email, password}) {
  return request({url: 'token', method: 'POST', body: {email, password}});
}

export async function logout() {
  globalThis.TOKEN = null;
  localStorage.removeItem('TOKEN');
}
