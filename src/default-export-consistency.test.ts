import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

import { compactMap } from './arrays';

const srcDir = path.dirname(url.fileURLToPath(import.meta.url));
const moduleDirs = ['arrays', 'maths', 'objects', 'strings'];

const sourceFiles = (
  await Promise.all(
    moduleDirs.map(async (dir) => {
      const files = await fs.readdir(path.join(srcDir, dir));

      return compactMap(files, (file) => {
        if (!file.endsWith('.ts')) return null;
        if (file.endsWith('.test.ts')) return null;
        if (file.endsWith('.test-d.ts')) return null;
        if (file === 'index.ts') return null;
        return `./${dir}/${file}`;
      });
    })
  )
).flat();

describe('default export consistency', () => {
  it.each(sourceFiles)(
    '%s exposes its default export as a named export too',
    async (specifier) => {
      const module: Record<string, unknown> = await import(specifier);

      if (!('default' in module)) {
        return;
      }

      const namedValues = Object.entries(module)
        .filter(([exportName]) => exportName !== 'default')
        .map(([, value]) => value);

      expect(namedValues).toContain(module.default);
    }
  );
});
