import { useStorage } from '@vueuse/core';
import type { RemovableRef } from '@vueuse/core';

export interface Inputs {
  nick: string;
  mail: string;
  link: string;
  editor: string;
}

export const useInputs = (): RemovableRef<Inputs> =>
  useStorage<Inputs>('WALINE_USER_CACHE', {
    nick: '',
    mail: '',
    link: '',
    editor: '',
  });
