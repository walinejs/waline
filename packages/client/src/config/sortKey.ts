import type { WalineCommentSorting } from '../typings/index.js';

export type SortKey = 'insertedAt_desc' | 'insertedAt_asc' | 'like_desc';

export const sortKeyMap: Record<WalineCommentSorting, SortKey> = {
  latest: 'insertedAt_desc',
  oldest: 'insertedAt_asc',
  hottest: 'like_desc',
};

export const sortingMethods = Object.keys(sortKeyMap) as WalineCommentSorting[];
