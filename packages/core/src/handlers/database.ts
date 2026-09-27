import type { WalineContext } from '../types.js';
import { requireAdmin } from '../utils/auth.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { requiredCapability } from '../utils/validation.js';

export const createDatabaseHandler = ({ models, now }: CoreRuntime) => ({
  async export(_input: object, ctx: WalineContext) {
    requireAdmin(ctx);
    const [Comment, Counter, Users] = await Promise.all([
      models.Comment.select({}),
      models.Counter.select({}),
      models.Users.select({}),
    ]);

    return {
      type: 'waline',
      version: 1,
      time: now().getTime(),
      tables: ['Comment', 'Counter', 'Users'],
      data: { Comment, Counter, Users },
    };
  },

  async import(input: { table: string; data: Record<string, unknown> }, ctx: WalineContext) {
    requireAdmin(ctx);
    const model = requiredCapability(models.get?.(input.table), `model:${input.table}`);
    const { objectId: _objectId, ...data } = input.data;

    return model.add(data);
  },

  async update(
    input: {
      table: string;
      objectId: string;
      data: Record<string, unknown>;
    },
    ctx: WalineContext,
  ) {
    requireAdmin(ctx);
    const model = requiredCapability(models.get?.(input.table), `model:${input.table}`);
    const {
      objectId: _objectId,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...data
    } = input.data;

    return model.update(data, { objectId: input.objectId });
  },

  async clear(input: { table: string }, ctx: WalineContext) {
    requireAdmin(ctx);
    const model = requiredCapability(models.get?.(input.table), `model:${input.table}`);

    return model.delete({});
  },
});
