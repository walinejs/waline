import { readonly, ref } from 'vue';
import { getConfig } from '../utils';

import type { DeepReadonly, Ref } from 'vue';
import type { WalineOptions } from '../config';
import type { Config } from '../utils';

export type ConfigRef = DeepReadonly<Ref<Config>>;

export type Update = (
  options: Partial<Omit<WalineOptions, 'el' | 'dark'>>
) => void;

interface UseConfig {
  config: ConfigRef;
  update: Update;
}

export const useConfig = (initOptions: WalineOptions): UseConfig => {
  let options = initOptions;
  const config = ref(getConfig(initOptions));

  const update = (newOptions: Partial<WalineOptions> = {}): void => {
    options = { ...options, ...newOptions };

    config.value = getConfig(options);
  };

  return {
    config: readonly(config),
    update,
  };
};
