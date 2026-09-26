import request from '../utils/request.js';

export const getCommentList = ({ page = 1, filter }) =>
  request({
    url: `comment?type=list&owner=${filter.owner}&status=${filter.status}&keyword=${filter.keyword}&page=${page}`,
    method: 'GET',
  });

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
