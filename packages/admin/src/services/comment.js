import request from '../utils/request.js';

export const getCommentList = ({ page = 1, filter, signal }) => {
  const query = new URLSearchParams({
    type: 'list',
    owner: filter.owner,
    status: filter.status,
    keyword: filter.keyword,
    page: String(page),
  });

  return request({
    url: `comment?${query.toString()}`,
    method: 'GET',
    signal,
  });
};

export const updateComment = (id, data) =>
  request({
    url: `comment/${id}`,
    method: 'PUT',
    body: data,
  });

export const replyComment = (data) =>
  request({
    url: 'comment',
    method: 'POST',
    body: data,
  });

export const deleteComment = (id) =>
  request({
    url: `comment/${id}`,
    method: 'DELETE',
  });
