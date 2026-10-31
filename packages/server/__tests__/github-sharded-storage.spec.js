import { createRequire } from 'node:module';

import { afterEach, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const thinkHelper = require('think-helper');
const { createHarness, commentData } = require('./helpers/sharded-store.js');

describe('sharded GitHub storage', () => {
  let harness = null;

  afterEach(async () => {
    if (harness) {
      await harness.dispose();
      harness = null;
    }
  });

  it('routes Comment and Counter rows into url-hashed shard families', () => {
    const { ShardManager } = require('../src/service/storage/github/shard-manager.js');
    const manager = new ShardManager({ storeDir: 'data' });
    const shardPath = manager.shardPath('Comment', '/post-1');

    expect(shardPath).toMatch(/^data\/comments\/[\da-f]{2}\/[\da-f]{4}\.csv$/u);
    // The same key always lands in the same family, a different key does not
    expect(manager.shardPath('Comment', '/post-1')).toBe(shardPath);
    expect(manager.shardPath('Comment', '/post-2')).not.toBe(shardPath);
    // Users are keyed one row per objectId, so they bucket on two characters
    expect(manager.shardPath('Users', 'abc123')).toBe('data/users/ab/ab.csv');
    expect(manager.shardPath('Counter', '/post-1')).toBe(
      shardPath.replace('comments', 'counters'),
    );
  });

  it('writes a comment as one shard plus manifest and reads it back after a cold start', async () => {
    harness = await createHarness();

    const comment = harness.model('Comment');
    const content = '第一条，带"引号"和\n换行';
    const created = await comment.add(commentData({ comment: content }));

    expect(typeof created.objectId).toBe('string');
    // Read-after-write: visible before the flush, so a comment never reads as
    // "saved, then gone after a refresh"
    expect(await comment.select({ url: '/post-1' })).toHaveLength(1);

    await harness.store.queue.flush();

    const files = [...harness.mock.listFiles().keys()];
    const shards = files.filter(
      (path) => path.startsWith('data/comments/') && !path.endsWith('_manifest.csv'),
    );

    expect(shards).toHaveLength(1);
    expect(files).toContain('data/comments/_manifest.csv');
    // Shard and manifest must land in the same commit
    expect(harness.mock.readText('data/comments/_manifest.csv')).toContain(
      shards[0].replace('data/', ''),
    );

    const cold = harness.coldStart();

    try {
      const rows = await cold.model('Comment').select({ url: '/post-1' });

      expect(rows).toHaveLength(1);
      expect(rows[0].objectId).toBe(created.objectId);
      expect(rows[0].comment).toBe(content);
      expect(rows[0].insertedAt).toBe('2026-09-25T10:00:00.000Z');
    } finally {
      cold.store.queue.stop();
    }
  });

  it('applies the patch returned by an update function (counter increment)', async () => {
    harness = await createHarness();

    const counter = harness.model('Counter');
    const row = await counter.add({ url: '/post-1', time: '1' });

    // This is exactly how the counter controller increments a view
    await counter.update((item) => ({ time: Number(item.time) + 1 }), {
      objectId: row.objectId,
    });

    expect((await counter.select({ url: '/post-1' }))[0].time).toBe('2');
  });

  it('deletes rows and reports grouped counts', async () => {
    harness = await createHarness();

    const comment = harness.model('Comment');

    await comment.add(commentData({ url: '/a', comment: '#1' }));
    await comment.add(commentData({ url: '/a', comment: '#2', status: 'waiting' }));
    await comment.add(commentData({ url: '/b', comment: '#3' }));
    await harness.store.queue.flush();

    expect(await comment.count({ url: ['IN', ['/a', '/b']] })).toBe(3);
    expect(await comment.count({ status: ['NOT IN', ['waiting', 'spam']] })).toBe(2);
    expect(
      (await comment.count({}, { group: ['url'] })).sort((left, right) =>
        left.url < right.url ? -1 : 1,
      ),
    ).toStrictEqual([
      { url: '/a', count: 2 },
      { url: '/b', count: 1 },
    ]);

    await comment.delete({ url: '/a' });
    await harness.store.queue.flush();

    expect(await comment.count({ url: '/a' })).toBe(0);
    expect(await comment.count({})).toBe(1);
  });

  it('exposes the thinkjs service contract through the adapter', async () => {
    harness = await createHarness();

    const originalThink = globalThis.think;

    globalThis.think = { ...thinkHelper, Service: Object };

    try {
      const ShardedStorage = require('../src/service/storage/github/sharded.js');
      const storage = new ShardedStorage('Comment', harness.store);
      const created = await storage.add(commentData({ url: '/adapter' }));

      expect((await storage.select({ url: '/adapter' }))[0].objectId).toBe(created.objectId);
      expect(await storage.count({ url: '/adapter' })).toBe(1);

      await storage.delete({ url: '/adapter' });

      expect(await storage.count({ url: '/adapter' })).toBe(0);
    } finally {
      globalThis.think = originalThink;
    }
  });
});
