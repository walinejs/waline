import Module, { createRequire } from 'node:module';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const cloudbaseStoragePath = require.resolve('../src/service/storage/cloudbase.js');
const originalLoad = Module._load;
const originalEnv = { ...process.env };

let createTableMock;
let describeTableMock;
let randomUUIDMock;
let runCommandsMock;

const loadStorage = () => {
  delete require.cache[cloudbaseStoragePath];

  return require(cloudbaseStoragePath);
};

describe('cloudbase storage', () => {
  beforeEach(() => {
    createTableMock = vi.fn().mockResolvedValue({});
    describeTableMock = vi.fn().mockResolvedValue({});
    randomUUIDMock = vi.fn(() => 'generated-id');
    runCommandsMock = vi.fn();

    process.env.TCB_ENV = 'test-env';
    process.env.TCB_ID = 'test-id';
    process.env.TCB_KEY = 'test-key';

    globalThis.think = {
      Service: class {},
      isEmpty: (value) => !value || Object.keys(value).length === 0,
      isString: (value) => typeof value === 'string',
    };

    Module._load = function mockLoad(request, parent, isMainModule) {
      if (request === 'tencentcloud-sdk-nodejs') {
        return {
          tcb: {
            v20180608: {
              Client: class {
                async CreateTable(request) {
                  return createTableMock(request);
                }

                async DescribeTable(request) {
                  return describeTableMock(request);
                }

                async RunCommands(request) {
                  return runCommandsMock(request);
                }
              },
            },
          },
        };
      }

      if (request === 'node:crypto') {
        return {
          randomUUID: randomUUIDMock,
        };
      }

      return originalLoad.call(this, request, parent, isMainModule);
    };
  });

  afterEach(() => {
    Module._load = originalLoad;
    delete require.cache[cloudbaseStoragePath];
    vi.restoreAllMocks();

    process.env = { ...originalEnv };
    delete globalThis.think;
  });

  it('serializes query commands for Tencent Cloud TCB', async () => {
    runCommandsMock.mockResolvedValue({
      Data: [
        JSON.stringify({
          cursor: {
            firstBatch: [{ _id: 'comment-1', nick: 'Waline' }],
          },
        }),
      ],
    });

    const Storage = loadStorage();
    const storage = new Storage('Comment');
    const insertedAt = new Date('2024-01-02T03:04:05.000Z');
    const data = await storage.select(
      {
        objectId: ['IN', ['comment-1', 'comment-2']],
        comment: ['LIKE', '%hello%'],
        insertedAt: ['>', insertedAt],
      },
      {
        desc: 'insertedAt',
        limit: 10,
        offset: 5,
        field: ['nick'],
      },
    );

    expect(data).toStrictEqual([{ nick: 'Waline', objectId: 'comment-1' }]);
    expect(createTableMock).toHaveBeenCalledWith({
      EnvId: 'test-env',
      TableName: 'Comment',
    });
    expect(runCommandsMock).toHaveBeenCalledTimes(1);
    expect(runCommandsMock.mock.calls[0][0]).toMatchObject({
      EnvId: 'test-env',
      MgoCommands: [
        {
          TableName: 'Comment',
          CommandType: 'QUERY',
        },
      ],
    });
    expect(JSON.parse(runCommandsMock.mock.calls[0][0].MgoCommands[0].Command)).toStrictEqual({
      find: 'Comment',
      filter: {
        _id: { $in: ['comment-1', 'comment-2'] },
        comment: {
          $regularExpression: {
            pattern: 'hello',
            options: 'u',
          },
        },
        insertedAt: {
          $gt: {
            $date: '2024-01-02T03:04:05.000Z',
          },
        },
      },
      sort: { insertedAt: -1 },
      limit: 10,
      skip: 5,
      projection: { nick: 1 },
    });
  });

  it('uses aggregate commands for grouped counts', async () => {
    runCommandsMock.mockResolvedValue({
      Data: [
        JSON.stringify({
          cursor: {
            firstBatch: [{ _id: { user_id: 'user-1', mail: 'test@example.com' }, count: 2 }],
          },
        }),
      ],
    });

    const Storage = loadStorage();
    const storage = new Storage('Comment');
    const data = await storage.count(
      {
        status: ['NOT IN', ['waiting', 'spam']],
      },
      { group: ['user_id', 'mail'] },
    );

    expect(data).toStrictEqual([{ user_id: 'user-1', mail: 'test@example.com', count: 2 }]);
    expect(JSON.parse(runCommandsMock.mock.calls[0][0].MgoCommands[0].Command)).toStrictEqual({
      aggregate: 'Comment',
      pipeline: [
        {
          $match: {
            status: {
              $nin: ['waiting', 'spam'],
            },
          },
        },
        {
          $group: {
            _id: {
              user_id: '$user_id',
              mail: '$mail',
            },
            count: {
              $sum: 1,
            },
          },
        },
      ],
      cursor: {},
    });
  });

  it('generates custom ids for inserted documents', async () => {
    runCommandsMock.mockResolvedValue({
      Data: [JSON.stringify({ ok: 1, n: 1 })],
    });

    const Storage = loadStorage();
    const storage = new Storage('Comment');
    const insertedAt = new Date('2024-02-03T04:05:06.000Z');
    const data = await storage.add({
      nick: 'Waline',
      insertedAt,
    });

    expect(data).toStrictEqual({
      nick: 'Waline',
      insertedAt,
      objectId: 'generated-id',
    });
    expect(JSON.parse(runCommandsMock.mock.calls[0][0].MgoCommands[0].Command)).toStrictEqual({
      insert: 'Comment',
      documents: [
        {
          _id: 'generated-id',
          nick: 'Waline',
          insertedAt: {
            $date: '2024-02-03T04:05:06.000Z',
          },
        },
      ],
    });
  });
});
