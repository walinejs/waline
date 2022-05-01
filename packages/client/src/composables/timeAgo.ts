import { useNow } from '@vueuse/core';
import { computed } from 'vue';
import { getTimeAgo } from '../utils';

import type { ComputedRef } from 'vue';
import type { WalineLocale } from '../typings';

export const useTimeAgo = (
  date: Date | string,
  locale: WalineLocale
): ComputedRef<string> => {
  const now = useNow();

  return computed(() => getTimeAgo(date, now.value, locale));
};
