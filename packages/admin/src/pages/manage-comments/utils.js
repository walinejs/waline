import md5 from 'md5';

export const buildAvatar = (email = '', avatar = '') => {
  if (avatar) return avatar;
  const normalizedEmail = typeof email === 'string' ? email : '';

  return `https://sdn.geekzu.org/avatar/${md5(normalizedEmail)}?s=40&r=G&d=`;
};

export const getPostUrl = (url) => (window.SITE_URL ?? '') + url;

const padZero = (num) => (num < 10 ? `0${num}` : num);

export const formatDate = (time) => {
  const date =
    typeof time === 'number'
      ? new Date(time)
      : new Date(/\d+-\d+-\d+\s\d+:\d+:\d+/.test(time) ? time.replaceAll('-', '/') : time);

  const localDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((item) => padZero(item))
    .join('-');
  const localTime = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((item) => padZero(item))
    .join(':');

  return `${localDate} ${localTime}`;
};
