import type { ComputedRef, InjectionKey } from 'vue';

import type { WalineConfig } from '../utils/config.js';

export const configKey: InjectionKey<ComputedRef<WalineConfig>> =
  Symbol('waline-config');

export * from './default.js';
export * from './highlighter.js';
export * from './i18n/index.js';
export * from './sortKey.js';
