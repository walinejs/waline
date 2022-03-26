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
