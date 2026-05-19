const buildFallbackAvatarDataUri = (name = '', size = 40) => {
  const label = (typeof name === 'string' ? name.trim().charAt(0) : '').toUpperCase() || 'W';
  const fontSize = Math.round(size * 0.42);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="walineAvatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f6bff" />
      <stop offset="100%" stop-color="#55b1ff" />
    </linearGradient>
  </defs>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#walineAvatarGradient)" />
  <text x="50%" y="50%" fill="#ffffff" font-family="Avenir Next, SF Pro Display, Segoe UI, PingFang SC, sans-serif" font-size="${fontSize}" font-weight="700" text-anchor="middle" dominant-baseline="central">${label}</text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const isDefaultAvatar = (avatar = '') => {
  if (!avatar) {
    return true;
  }

  return /https?:\/\/seccdn\.libravatar\.org\/avatar\//u.test(avatar);
};

export const buildAvatar = (name = '', email = '', avatar = '') => {
  if (!isDefaultAvatar(avatar)) {
    return avatar;
  }

  return buildFallbackAvatarDataUri(name);
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
