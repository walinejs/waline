'use strict';

/**
 * Integration scaffolding for the sharded GitHub store: an in-memory GitHub
 * plus a real set of storage components.
 *
 * None of the store modules are mocked; only the GitHub dependency is swapped
 * for an in-memory implementation, so what the tests exercise matches what runs
 * against a real repository.
 */

const { MockGitHub } = require('./mock-github.js');
const { loadConfig } = require('../../src/service/storage/github/mode.js');
const {
  createStore,
  createModelFactory,
} = require('../../src/service/storage/github/store.js');

// A logger that stays out of the way, so test output is not buried in logs.
const silentLogger = {
  debug: () => undefined,
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
};

async function createHarness(overrides = {}, mockOptions = {}) {
  const mock = new MockGitHub(mockOptions);

  await mock.start();

  const config = {
    ...loadConfig({}),
    token: 'test-token',
    repo: 'owner/repo',
    branch: 'main',
    apiBase: mock.apiBase,
    // Dedup defaults to off so cases cannot interfere through "same content
    // inside the window"
    dedupWindowSeconds: 0,
    ...overrides,
  };
  const store = createStore(config, { logger: silentLogger });

  return {
    mock,
    store,
    config,
    model: createModelFactory(store),
    // Simulate a cold start: drop all process state and reload from the repository
    coldStart() {
      const fresh = createStore(config, { logger: silentLogger });

      return { store: fresh, model: createModelFactory(fresh) };
    },
    async dispose() {
      store.queue.stop();
      await mock.stop();
    },
  };
}

// Build a comment row with the fields controllers actually write.
const commentData = (overrides = {}) => ({
  user_id: '',
  comment: 'hello world',
  insertedAt: '2026-09-25T10:00:00.000Z',
  ip: '127.0.0.1',
  link: 'https://example.com',
  mail: 'a@example.com',
  nick: 'Alice',
  pid: '',
  rid: '',
  status: 'approved',
  ua: 'Mozilla/5.0',
  url: '/post-1',
  ...overrides,
});

module.exports = { createHarness, silentLogger, commentData };
