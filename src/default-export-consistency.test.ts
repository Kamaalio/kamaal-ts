import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

import * as arraysIndex from './arrays/index.js';
import { compactMap } from './arrays';
import * as mathsIndex from './maths/index.js';
import * as objectsIndex from './objects/index.js';
import * as stringsIndex from './strings/index.js';

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

const indexModules: Record<string, Record<string, unknown>> = {
  arrays: arraysIndex,
  maths: mathsIndex,
  objects: objectsIndex,
  strings: stringsIndex,
};

describe('module index re-exports', () => {
  it.each(sourceFiles)(
    '%s is re-exported from its directory index',
    async (specifier) => {
      const dir = specifier.split('/')[1];
      const module: Record<string, unknown> = await import(specifier);
      const indexModule = indexModules[dir];

      const namedExports = Object.entries(module).filter(
        ([exportName]) => exportName !== 'default'
      );

      for (const [exportName, value] of namedExports) {
        expect(indexModule?.[exportName]).toBe(value);
      }
    }
  );
});
