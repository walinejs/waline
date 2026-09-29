import { badRequest } from '../error.js';
import type { WalineContext } from '../types.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { requiredString } from '../utils/validation.js';

export const createCounterHandler = ({ models, now }: CoreRuntime) => ({
  async get(input: { path?: string | string[]; type?: string | string[] }, ctx: WalineContext) {
    const paths = typeof input.path === 'string' ? input.path.split(',') : (input.path ?? []);
    const types =
      typeof input.type === 'string'
        ? input.type.split(',')
        : input.type?.length
          ? input.type
          : ['time'];

    if (!paths.length) return 0;

    const rows = await models.Counter.select({ url: ['IN', paths] });
    const byUrl = new Map(rows.map((item) => [item.url, item]));
    const data = paths.map((path) => {
      const values: Record<string, number> = {};

      for (const type of types) {
        values[type] = Number(byUrl.get(path)?.[type]) || 0;
      }

      return types.length === 1 && ctx.state.deprecated ? values[types[0]] : values;
    });

    return paths.length === 1 && ctx.state.deprecated ? data[0] : data;
  },

  async update(
    input: { path: string; type?: string; action?: 'inc' | 'desc' },
    ctx: WalineContext,
  ) {
    const path = requiredString(input.path, 'path');
    const type = input.type ?? 'time';
    const action = input.action ?? 'inc';

    if (!['inc', 'desc'].includes(action)) badRequest({ field: 'action' });

    const rows = await models.Counter.select({ url: path });

    if (!rows.length) {
      if (action === 'desc') return ctx.state.deprecated ? 0 : [0];

      await models.Counter.add({ url: path, [type]: 1 }, { access: { read: true, write: true } });

      return ctx.state.deprecated ? 1 : [{ [type]: 1 }];
    }

    const updated = await models.Counter.update(
      (item) => ({
        [type]: action === 'desc' ? (Number(item[type]) || 1) - 1 : (Number(item[type]) || 0) + 1,
        updatedAt: now(),
      }),
      { objectId: ['IN', rows.map(({ objectId }) => objectId)] },
    );
    const value = Number(updated[0]?.[type]) || 0;

    return ctx.state.deprecated ? value : [{ [type]: value }];
  },
});
