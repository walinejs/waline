import type { Avatar, Meta } from './options';

const availableAvatar: Avatar[] = [
  'mp',
  'identicon',
  'monsterid',
  'wavatar',
  'robohash',
  'retro',
  '',
];

const availableMeta: Meta[] = ['nick', 'mail', 'link'];

export const getAvatar = (avatar?: Avatar): Avatar =>
  avatar && availableAvatar.includes(avatar) ? avatar : 'mp';

export const getMeta = (meta: Meta[]): Meta[] =>
  meta.filter((item) => availableMeta.includes(item));

export const defaultGravatarCDN = 'https://seccdn.libravatar.org/avatar/';

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

export const defaultTexRenderer = (blockMode: boolean): string =>
  blockMode === true
    ? '<p class="vtex">Tex is not available in preview</p>'
    : '<span class="vtex">Tex is not available in preview</span>';
