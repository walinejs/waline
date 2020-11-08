export function fetchCount({serverURL, path}) {
  const url = `${serverURL}/comment/count?url=${encodeURIComponent(path)}`;
  return fetch(url).then(resp => resp.text());
}

export function fetchList({serverURL, path, page, pageSize}) {
  const url = `${serverURL}/comment/list?path=${encodeURIComponent(path)}&pageSize=${pageSize}&page=${page}`;
  return fetch(url).then(resp => resp.json());
}

export function postComment({serverURL, comment}) {
  const url = `${serverURL}/comment/save`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });
}