import md5 from 'md5';

export const buildAvatar = (email = '', avatar = '') => {
  if (avatar && !String(avatar).startsWith('data:image/svg+xml')) {
    return avatar;
  }

  // Libravatar/Gravatar spec requires normalising the email (trim + lowercase) before hashing
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  return `https://seccdn.libravatar.org/avatar/${md5(normalizedEmail)}`;
};

export const getPostUrl = (url) => (window.SITE_URL ?? '') + url;

const padZero = (num) => (num < 10 ? `0${num}` : num);

export const formatDate = (time) => {
  const date =
    typeof time === 'number'
      ? new Date(time)
      : new Date(/\d+-\d+-\d+\s\d+:\d+:\d+/u.test(time) ? time.replaceAll('-', '/') : time);

  const localDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((item) => padZero(item))
    .join('-');
  const localTime = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((item) => padZero(item))
    .join(':');

  return `${localDate} ${localTime}`;
};
