import request from '../utils/request.js';

export const get2FAToken = (email) => {
  const query = email ? `?email=${encodeURIComponent(email)}` : '';

  return request({ url: `token/2fa${query}`, method: 'GET' });
};

export const gen2FAToken = (data) => request({ url: 'token/2fa', method: 'POST', body: data });

export const updateProfile = (data) => request({ url: 'user', method: 'PUT', body: data });

export const getUserList = ({ page }) =>
  request({
    url: `user?page=${page}`,
    method: 'GET',
  });

export const updateUser = ({ id, ...data }) =>
  request({ url: `user/${id}`, method: 'PUT', body: data });
