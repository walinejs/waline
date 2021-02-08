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

  const qs = new URLSearchParams(location.search);
  let token = globalThis.TOKEN || sessionStorage.getItem('TOKEN') || qs.get('token');
  if(!token) {
    token = localStorage.getItem('TOKEN');
  }
  if(token) {
    opts.headers.Authorization = `Bearer ${token}`;
  }

  let baseUrl = globalThis.serverURL;
  if(!baseUrl) {
    const match = location.pathname.match(/(.*?\/)ui/);
    baseUrl = match ? match[1] : '/';
  }
  
  return fetch(baseUrl + opts.url, opts).then(resp => {
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
