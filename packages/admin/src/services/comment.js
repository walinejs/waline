import request from '../utils/request';

export async function getCommentList({ page = 1, filter }) {
  return request({
    url: `comment?type=list&owner=${filter.owner}&status=${filter.status}&keyword=${filter.keyword}&page=${page}`,
    method: 'GET',
  });
}

export async function updateComment(id, data) {
  return request({
    url: `comment/${id}`,
    method: 'PUT',
    body: data,
  });
}

export async function replyComment(data) {
  return request({
    url: 'comment',
    method: 'POST',
    body: data,
  });
}

export async function deleteComment(id) {
  return request({
    url: `comment/${id}`,
    method: 'DELETE',
  });
}
