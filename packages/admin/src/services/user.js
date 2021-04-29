import request from '../utils/request';

export function updateProfile(data) {
  return request({ url: 'user', method: 'PUT', body: data });
}
