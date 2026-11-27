import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

test('all user effects restrict popup messages to the admin origin', async () => {
  const source = await readFile(new URL('../src/store/user.js', import.meta.url), 'utf8');
  const messages = [];
  const storage = { getItem: () => 'secret', setItem() {} };
  const context = {
    window: {
      location: { origin: 'https://admin.example' },
      opener: { postMessage: (data, origin) => messages.push({ data, origin }) },
    },
    localStorage: storage,
    sessionStorage: storage,
    getUserInfo: async () => ({ objectId: 1 }),
    login: async () => ({ token: 'secret', objectId: 1 }),
    updateProfile: async () => {},
  };
  vm.createContext(context);
  vm.runInContext(
    source.replace(/^import .*;\n/gmu, '').replace('export const user =', 'globalThis.user ='),
    context,
  );
  const effects = context.user.effects({ user: { setUser() {}, updateUser() {} } });
  await effects.loadUserInfo();
  await effects.login({ remember: true });
  await effects.updateProfile({ display_name: 'Updated' });
  assert.equal(messages.length, 3);
  for (const message of messages) {
    assert.equal(message.origin, 'https://admin.example');
    assert.notEqual(message.origin, '*');
  }
});
