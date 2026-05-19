const crypto = require('node:crypto');

const nunjucks = require('nunjucks');
const helper = require('think-helper');

const { GRAVATAR_STR } = process.env;

const env = new nunjucks.Environment();

env.addFilter('md5', (str) => helper.md5(str));
env.addFilter('sha256', (str) => crypto.createHash('sha256').update(str).digest('hex'));

const escapeSvgText = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const buildFallbackAvatarDataUri = (nick = '', size = 80) => {
  const label = (typeof nick === 'string' ? nick.trim().charAt(0) : '').toUpperCase() || 'W';
  const fontSize = Math.round(size * 0.42);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="walineServerAvatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f6bff" />
      <stop offset="100%" stop-color="#55b1ff" />
    </linearGradient>
  </defs>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#walineServerAvatarGradient)" />
  <text x="50%" y="50%" fill="#ffffff" font-family="Avenir Next, SF Pro Display, Segoe UI, PingFang SC, sans-serif" font-size="${fontSize}" font-weight="700" text-anchor="middle" dominant-baseline="central">${escapeSvgText(label)}</text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

module.exports = class extends think.Service {
  async stringify(comment) {
    const fn = think.config('avatarUrl');

    if (think.isFunction(fn)) {
      const ret = await fn(comment);

      if (think.isString(ret) && ret) {
        return ret;
      }
    }

    if (GRAVATAR_STR) {
      return env.renderString(GRAVATAR_STR, comment);
    }

    return buildFallbackAvatarDataUri(comment?.nick);
  }
};
