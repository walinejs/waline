/* oxlint-disable unicorn/no-array-callback-reference, eslint/curly, eslint/no-underscore-dangle, eslint/no-await-in-loop, typescript/no-explicit-any, typescript/no-unnecessary-type-parameters, typescript/no-unnecessary-type-assertion, typescript/no-unsafe-assignment, typescript/strict-boolean-expressions, typescript/no-unnecessary-type-conversion, typescript/no-unnecessary-type-arguments */
import type {
  CountOptions,
  GroupedCount,
  SelectOptions,
  WalineComment,
  WalineCounter,
  WalineModel,
  WalineModels,
  WalineUser,
  Where,
} from '@waline/core';

import type { D1Database } from './types.js';

const identifier = (value: string): string => {
  if (!/^[A-Za-z][A-Za-z0-9_]*$/u.test(value)) throw new TypeError(`Invalid identifier: ${value}`);
  return `"${value}"`;
};

const column = (value: string): string =>
  identifier(value.toLowerCase() === 'objectid' ? 'id' : value);
const normalize = (value: unknown): unknown =>
  value instanceof Date ? value.toISOString() : typeof value === 'boolean' ? Number(value) : value;

const mapRow = <T extends object>(row: Record<string, unknown>): T => {
  const { id, ...data } = row;
  return { ...data, objectId: String(id) } as T;
};

const whereSql = (where: Where<any>, values: unknown[]): string => {
  const clauses: string[] = [];
  for (const [key, expected] of Object.entries(where)) {
    if (key === '_complex') continue;
    const name = column(key);
    if (expected === undefined || expected === null) {
      clauses.push(`${name} IS NULL`);
      continue;
    }
    if (!Array.isArray(expected)) {
      clauses.push(`${name} = ?`);
      values.push(normalize(expected));
      continue;
    }
    const [operator, operand] = expected as [string, unknown];
    if (operator === 'IN' || operator === 'NOT IN') {
      const list = Array.isArray(operand) ? operand : [operand];
      clauses.push(
        list.length
          ? `${name} ${operator} (${list.map(() => '?').join(', ')})`
          : operator === 'IN'
            ? '0'
            : '1',
      );
      values.push(...list.map(normalize));
    } else {
      const sqlOperator = operator === 'LIKE' ? 'LIKE' : operator;
      if (!['>', '>=', '<', '<=', '!=', 'LIKE'].includes(sqlOperator))
        throw new TypeError(`Unsupported operator: ${operator}`);
      clauses.push(`${name} ${sqlOperator} ?`);
      values.push(normalize(operand));
    }
  }

  if (where._complex) {
    const complex = where._complex as Where<any> & { _logic?: 'and' | 'or' };
    const pieces: string[] = [];
    for (const [key, value] of Object.entries(complex)) {
      if (key === '_logic') continue;
      pieces.push(whereSql({ [key]: value }, values));
    }
    if (pieces.length) clauses.push(`(${pieces.join(complex._logic === 'or' ? ' OR ' : ' AND ')})`);
  }
  return clauses.filter(Boolean).join(' AND ') || '1';
};

class D1Model<T extends object> implements WalineModel<T> {
  readonly table: string;

  constructor(
    private readonly database: D1Database,
    tableName: string,
    prefix: string,
  ) {
    this.table = identifier(`${prefix}${tableName}`);
  }

  async select(where: Where<T>, options: SelectOptions<T> = {}): Promise<T[]> {
    const values: unknown[] = [];
    const fields = options.field?.length
      ? [...new Set([...options.field.map(String), 'objectId'])].map(column).join(', ')
      : '*';
    let sql = `SELECT ${fields} FROM ${this.table} WHERE ${whereSql(where, values)}`;
    const orders =
      options.order ?? (options.desc ? [{ field: options.desc, direction: 'desc' as const }] : []);
    if (orders.length) {
      sql += ` ORDER BY ${orders.map((order) => `${column(String(order.field))} ${order.direction.toUpperCase()}${order.nulls ? ` NULLS ${order.nulls.toUpperCase()}` : ''}`).join(', ')}`;
    }
    if (options.limit !== undefined) {
      sql += ' LIMIT ?';
      values.push(options.limit);
    } else if (options.offset !== undefined) sql += ' LIMIT -1';
    if (options.offset !== undefined) {
      sql += ' OFFSET ?';
      values.push(options.offset);
    }
    const result = await this.database
      .prepare(sql)
      .bind(...values)
      .all<Record<string, unknown>>();
    return (result.results ?? []).map(mapRow<T>);
  }

  async count(
    where: Where<T> = {},
    options: CountOptions<T> = {},
  ): Promise<number | GroupedCount[]> {
    const values: unknown[] = [];
    const groups = options.group?.map(String) ?? [];
    const fields = groups.length
      ? `${groups.map(column).join(', ')}, COUNT(*) AS count`
      : 'COUNT(*) AS count';
    let sql = `SELECT ${fields} FROM ${this.table} WHERE ${whereSql(where, values)}`;
    if (groups.length) sql += ` GROUP BY ${groups.map(column).join(', ')}`;
    const result = await this.database
      .prepare(sql)
      .bind(...values)
      .all<GroupedCount>();
    return groups.length ? (result.results ?? []) : Number(result.results?.[0]?.count ?? 0);
  }

  async add(input: Partial<T>): Promise<T> {
    const data = { ...input } as Record<string, unknown>;
    const suppliedId = data.objectId;
    delete data.objectId;
    if (suppliedId !== undefined) data.id = suppliedId;
    const now = new Date().toISOString();
    data.createdAt ??= now;
    data.updatedAt ??= now;
    const entries = Object.entries(data).filter(([, value]) => value !== undefined);
    const sql = `INSERT INTO ${this.table} (${entries.map(([key]) => column(key)).join(', ')}) VALUES (${entries.map(() => '?').join(', ')}) RETURNING *`;
    const row = await this.database
      .prepare(sql)
      .bind(...entries.map(([, value]) => normalize(value)))
      .first<Record<string, unknown>>();
    if (!row) throw new Error('D1 insert did not return a row');
    return mapRow<T>(row);
  }

  async update(data: Partial<T> | ((current: T) => Partial<T>), where: Where<T>): Promise<T[]> {
    const rows = await this.select(where);
    const updated: T[] = [];
    for (const row of rows) {
      const changes = typeof data === 'function' ? data(row) : data;
      const entries = Object.entries({ ...changes, updatedAt: new Date().toISOString() }).filter(
        ([key, value]) => key !== 'objectId' && value !== undefined,
      );
      if (!entries.length) continue;
      const statement = `UPDATE ${this.table} SET ${entries.map(([key]) => `${column(key)} = ?`).join(', ')} WHERE id = ? RETURNING *`;
      const result = await this.database
        .prepare(statement)
        .bind(
          ...entries.map(([, value]) => normalize(value)),
          (row as { objectId: unknown }).objectId,
        )
        .first<Record<string, unknown>>();
      if (result) updated.push(mapRow<T>(result));
    }
    return updated;
  }

  async delete(where: Where<T>): Promise<void> {
    const values: unknown[] = [];
    await this.database
      .prepare(`DELETE FROM ${this.table} WHERE ${whereSql(where, values)}`)
      .bind(...values)
      .run();
  }
}

export interface CreateD1ModelsOptions {
  tablePrefix?: string;
}

export const createD1Models = (
  database: D1Database,
  options: CreateD1ModelsOptions = {},
): WalineModels => {
  const prefix = options.tablePrefix ?? 'wl_';
  const get = (name: string): WalineModel<Record<string, unknown>> =>
    new D1Model(database, name, prefix);
  return {
    Comment: new D1Model<WalineComment>(database, 'Comment', prefix),
    Counter: new D1Model<WalineCounter>(database, 'Counter', prefix),
    Users: new D1Model<WalineUser>(database, 'Users', prefix),
    get,
  };
};
