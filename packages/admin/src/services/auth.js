import request from '../utils/request';

export async function getUserInfo() {
  return request('token').catch(_ => Promise.reject(new Error('获取用户信息失败')))
}

export async function login() {
  return request({url: 'token', method: 'POST'});
}

export async function logout() {
  return request({url: 'token', method: 'DELETE'});
}
