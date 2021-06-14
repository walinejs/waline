import md5 from 'md5';

export function buildAvatar(email = '') {
  if (typeof email !== 'string') {
    email = '';
  }

  return `https://sdn.geekzu.org/avatar/${md5(email)}?s=40&r=G&d=`;
}

export function getPostUrl(url) {
  if (!global.SITE_URL) {
    return url;
  }
  return global.SITE_URL + url;
}

export function formatDate(time) {
  const d = new Date(
    /\d+-\d+-\d+\s\d+:\d+:\d+/.test(time) ? time.replace(/-/g, '/') : time
  );
  const p = (n) => (n < 10 ? '0' + n : n);
  const localDate = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map(p)
    .join('-');
  const localTime = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(p)
    .join(':');
  return localDate + ' ' + localTime;
}
