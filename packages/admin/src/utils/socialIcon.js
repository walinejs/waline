export const getSocialIconSrc = (social) => {
  switch (social) {
    case 'github':
      return new URL('../img/github.svg', import.meta.url).href;
    case 'twitter':
      return new URL('../img/twitter.svg', import.meta.url).href;
    case 'facebook':
      return new URL('../img/facebook.svg', import.meta.url).href;
    case 'weibo':
      return new URL('../img/weibo.svg', import.meta.url).href;
    case 'qq':
      return new URL('../img/qq.svg', import.meta.url).href;
    case 'oidc':
      return new URL('../img/oidc.svg', import.meta.url).href;
    case 'google':
      return new URL('../img/google.svg', import.meta.url).href;
    case 'huawei':
      return new URL('../img/huawei.svg', import.meta.url).href;
    default:
      return '';
  }
};
