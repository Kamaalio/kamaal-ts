const subpathExports: Record<string, string[]> = {
  '@kamaalio/kamaal': ['objects', 'maths', 'strings', 'arrays', 'asserts'],
  '@kamaalio/kamaal/arrays': [
    'reversedForEach',
    'compactMap',
    'uniques',
    'zip',
    'chunked',
    'appended',
    'prepended',
    'removed',
  ],
  '@kamaalio/kamaal/maths': ['sum', 'min', 'max', 'median'],
  '@kamaalio/kamaal/objects': [
    'flatten',
    'omit',
    'omitBy',
    'toEntries',
    'unflatten',
  ],
  '@kamaalio/kamaal/strings': ['isNumber'],
  '@kamaalio/kamaal/asserts': ['invariant'],
};

describe('package.json subpath exports', () => {
  it.each(Object.entries(subpathExports))(
    '%s resolves its expected exports',
    async (specifier, expectedExports) => {
      const module: Record<string, unknown> = await import(specifier);

      for (const exportName of expectedExports) {
        expect(module).toHaveProperty(exportName);
      }
    }
  );
});
