export default async function request(url, opts = {}) {
  if(typeof url === 'object') {
    opts = url;
  } else if(typeof url === 'string') {
    opts.url = url;
  }

  if(!opts.headers) {
    opts.headers = {};
  }
  if(opts.body && !(opts.body instanceof FormData)) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }

  let token = globalThis.TOKEN;
  if(!token) {
    token = localStorage.getItem('TOKEN');
  }
  if(token) {
    opts.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(globalThis.serverURL + opts.url, opts).then(resp => {
    if(resp.ok) {
      return resp.json();
    }

    if(resp.status === 401) {
      throw new Error(401);
    }

    throw new Error(`${resp.status}: ${resp.statusText}`);
  }).then(resp => {
    if(resp.errno !== 0) {
      throw new Error(resp.errmsg);
    }

    return resp.data;
  });
}
