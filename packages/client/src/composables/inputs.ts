import { reactive } from 'vue';
import { useStore } from './store';

import type { Store } from './store';

export interface Inputs {
  nick: string;
  mail: string;
  link: string;
  editor: string;
}

let store: Store;
let inputs: Inputs;

export const useInputs = (): { inputs: Inputs; store: Store } => {
  if (!inputs) {
    store = useStore('WALINE_USER_CACHE');

    inputs = reactive({
      nick: store.get<string>('nick') || '',
      mail: store.get<string>('mail') || '',
      link: store.get<string>('link') || '',
      editor: '',
    });
  }

  return { inputs, store };
};
