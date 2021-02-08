import md5 from 'md5';

export function buildAvatar(email = '') {
  return `https://cdn.v2ex.com/gravatar/${md5(email)}?s=40&r=G&d=`;
}

export function getPostUrl(url) {
  if(!global.SITE_URL) {
    return url;
  }
  return global.SITE_URL + url;
}