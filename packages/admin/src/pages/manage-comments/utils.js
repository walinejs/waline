import md5 from 'md5';

export const buildAvatar = (email = '', avatar = '') => {
  if (avatar) return avatar;

  if (typeof email !== 'string') email = '';

  return `https://sdn.geekzu.org/avatar/${md5(email)}?s=40&r=G&d=`;
};

export const getPostUrl = (url) => (window.SITE_URL || '') + url;

export function formatDate(time) {
  let d;

  if (typeof time === 'number') {
    d = new Date(time);
  } else {
    d = new Date(
      /\d+-\d+-\d+\s\d+:\d+:\d+/.test(time) ? time.replace(/-/g, '/') : time,
    );
  }

  const p = (n) => (n < 10 ? '0' + n : n);
  const localDate = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map(p)
    .join('-');
  const localTime = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(p)
    .join(':');

  return localDate + ' ' + localTime;
}
