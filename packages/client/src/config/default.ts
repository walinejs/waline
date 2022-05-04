import type { WalineMeta } from '../typings';

const availableMeta: WalineMeta[] = ['nick', 'mail', 'link'];

export const getMeta = (meta: WalineMeta[]): WalineMeta[] =>
  meta.filter((item) => availableMeta.includes(item));

export const defaultLang = 'zh-CN';

export const defaultUploadImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });

export const defaultTexRenderer = (blockMode: boolean): string =>
  blockMode === true
    ? '<p class="wl-tex">Tex is not available in preview</p>'
    : '<span class="wl-tex">Tex is not available in preview</span>';
