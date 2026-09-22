# Kamaal.ts

`@kamaalio/kamaal` is a small, dependency-free collection of TypeScript utilities for arrays, maths, objects, strings, type helpers, and runtime assertions. It ships as native ES modules with declaration files.

## Installation

```sh
pnpm add @kamaalio/kamaal
```

The package requires Node.js 21 or newer.

## Usage

Import a category from the package root:

```ts
import { arrays, maths, objects } from '@kamaalio/kamaal';

const chunks = arrays.chunked([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

const middle = maths.median([9, 1, 5]);
// 5

const flat = objects.flatten({ user: { name: 'Ada' } });
// { 'user.name': 'Ada' }
```

For smaller imports, use a category subpath:

```ts
import { compactMap, zip } from '@kamaalio/kamaal/arrays';
import { invariant } from '@kamaalio/kamaal/asserts';
```

## API

### Arrays

Available from `@kamaalio/kamaal/arrays` or `arrays` at the package root.

| Function                           | Description                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `appended(array, element)`         | Returns a copy with `element` at the end.                                                                |
| `prepended(array, element)`        | Returns a copy with `element` at the beginning.                                                          |
| `removed(array, index)`            | Returns a copy without the item at `index`; returns the original array when the index is beyond its end. |
| `chunked(array, chunkSize)`        | Splits an array into chunks of up to `chunkSize`.                                                        |
| `compactMap(array, transformer)`   | Maps values and omits `null` and `undefined` results.                                                    |
| `uniques(array)`                   | Returns values with duplicates removed, preserving first-occurrence order.                               |
| `zip(first, second)`               | Pairs items until the shorter array ends.                                                                |
| `zip(first, second, true)`         | Pairs through the longer array, using `undefined` for missing values.                                    |
| `reversedForEach(array, callback)` | Calls `callback` for every item, from the last item to the first.                                        |

```ts
const values = compactMap(['1', 'nope', '3'], (value) => {
  const number = Number(value);
  return Number.isNaN(number) ? undefined : number;
});
// [1, 3]

zip(['a', 'b'], [1, 2, 3], true);
// [['a', 1], ['b', 2], [undefined, 3]]
```

### Maths

Available from `@kamaalio/kamaal/maths` or `maths` at the package root.

| Function          | Description                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sum(numbers)`    | Adds all numbers; an empty array produces `0`.                                                                                                                      |
| `min(numbers)`    | Returns the smallest number, or `null` for an empty array.                                                                                                          |
| `max(numbers)`    | Returns the largest number, or `null` for an empty array.                                                                                                           |
| `median(numbers)` | Returns the middle value after sorting without mutating the input. For an even-length array, it returns the lower middle value; an empty array returns `undefined`. |

### Objects

Available from `@kamaalio/kamaal/objects` or `objects` at the package root.

| Function                       | Description                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `omit(object, keyOrKeys)`      | Returns an object without the specified key or keys.                                                   |
| `omitBy(object, predicate)`    | Returns an object without values for which `predicate` returns `true`.                                 |
| `flatten(object)`              | Flattens nested object keys with `.` separators; arrays remain values.                                 |
| `unflatten(object, delimiter)` | Builds a nested object from delimited keys.                                                            |
| `toEntries(object)`            | A typed counterpart to `Object.entries`.                                                               |
| `recordGet(record, key)`       | Type-safe access to a record's value for a key, returning `undefined` for keys not present at runtime. |

```ts
const result = objects.unflatten(
  { 'settings.theme.name': 'midnight', version: 1 },
  '.'
);
// { settings: { theme: { name: 'midnight' } }, version: 1 }
```

### Strings, types, and assertions

- `isNumber(value)` from `@kamaalio/kamaal/strings` checks whether a non-empty string can be converted to a number.
- `NonEmptyArray`, `Optional`, `Entry`, `Character`, and `StringUnion` are exported as types from `@kamaalio/kamaal/types`.
- `invariant(condition, message?)` from `@kamaalio/kamaal/asserts` throws when `condition` is false and narrows the condition when it succeeds.

```ts
import { invariant } from '@kamaalio/kamaal/asserts';

function getFirst<T>(items: T[]): T {
  invariant(items.length > 0, 'Expected at least one item');
  return items[0]!;
}
```

## Development

```sh
pnpm install
pnpm test
pnpm quality
pnpm build
```

`pnpm quality` runs formatting, linting, and type checking. The compiled package is written to `dist/` by `pnpm build`.

## License

[MIT](LICENSE)
