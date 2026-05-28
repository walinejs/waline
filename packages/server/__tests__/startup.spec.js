import { spawn } from 'node:child_process';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const testDir = import.meta.dirname;

describe('server startup', () => {
  it('does not crash with the __filename loader error', async () => {
    const serverRoot = path.join(testDir, '..');
    const script = `
      const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
      const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');

      RegisterHTMLHandler(liteAdaptor());
      require('./vanilla.js');
      console.log('startup-script-loaded');
      setTimeout(() => process.exit(0), 50);
    `;

    const output = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['-e', script], {
        cwd: serverRoot,
      });
      let data = '';

      child.stdout.on('data', (chunk) => {
        data += chunk.toString();
      });
      child.stderr.on('data', (chunk) => {
        data += chunk.toString();
      });
      child.on('error', reject);
      child.on('close', () => {
        resolve(data);
      });
    });

    expect(output).toContain('startup-script-loaded');
    expect(output).not.toContain("Cannot set properties of undefined (setting '__filename')");
  });
});
