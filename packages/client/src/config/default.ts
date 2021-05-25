export const defaultGravatarCDN = 'https://cdn.v2ex.com/gravatar/';

export const availableAvatar = [
  'mp',
  'identicon',
  'monsterid',
  'wavatar',
  'robohash',
  'retro',
  '',
];

export const availableMeta = ['nick', 'mail', 'link'];

export const defaultLang = 'zh-CN';

export const defaultUploadImage = (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  return fetch('https://pic.alexhchu.com/api/upload', {
    method: 'POST',
    body: formData,
  })
    .then((resp) => resp.json())
    .then((resp: { data: { url: string } }) => resp.data.url);
};
