import { useStorage } from '@vueuse/core';
import type { RemovableRef } from '@vueuse/core';

export interface UserMeta {
  nick: string;
  mail: string;
  link: string;
}

export const useUserMeta = (): RemovableRef<UserMeta> =>
  useStorage<UserMeta>('WALINE_USER_META', {
    nick: '',
    mail: '',
    link: '',
  });

export const useEditor = (): RemovableRef<string> =>
  useStorage<string>('WALINE_COMMENT_BOX_EDITOR', '');
