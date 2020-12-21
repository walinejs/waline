import md5 from 'md5';

export function buildAvatar(email) {
  return `https://gravatar.loli.net/avatar/${md5(email)}?s=40&r=G&d=`;
}

export function getPostUrl(url) {
  if(!global.SITE_URL) {
    return url;
  }
  return global.SITE_URL + url;
}