export function fetchCount({serverURL, path}) {
  const url = `${serverURL}/comment?type=count&url=${encodeURIComponent(path)}`;
  return fetch(url).then(resp => resp.text());
}

export function fetchRecent({serverURL, count}) {
  const url = `${serverURL}/comment?type=recent&count=${count}`;
  return fetch(url).then(resp => resp.json());
}

export function fetchList({serverURL, path, page, pageSize}) {
  const url = `${serverURL}/comment?path=${encodeURIComponent(path)}&pageSize=${pageSize}&page=${page}`;
  return fetch(url).then(resp => resp.json());
}

export function postComment({serverURL, comment}) {
  const url = `${serverURL}/comment`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });
}

export function fetchVisitCount({serverURL, path}) {
  const url = `${serverURL}/article?path=${encodeURIComponent(path)}`;
  return fetch(url).then(resp => resp.json());
}

export function postVisitCount({serverURL, path}) {
  const url = `${serverURL}/article`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({path})
  });
}