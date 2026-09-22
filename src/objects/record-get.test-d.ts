import { expectTypeOf } from 'vitest';

import recordGet from './record-get';

const record = { 0x26: 'amp', 0x3c: 'lt' } as const;

describe('recordGet', () => {
  it('resolves to the exact value type when the key is the literal that produced it', () => {
    expectTypeOf(recordGet(record, 0x26)).toEqualTypeOf<'amp'>();
  });

  it('resolves to an optional union of every value for a literal key absent from the record', () => {
    expectTypeOf(recordGet(record, 0x3f)).toEqualTypeOf<
      'amp' | 'lt' | undefined
    >();
  });

  it('resolves to an optional union of every value when the key is only the record key base type', () => {
    declareNumber((key) => {
      expectTypeOf(recordGet(record, key)).toEqualTypeOf<
        'amp' | 'lt' | undefined
      >();
    });
  });

  it('restricts a non-literal key to the record key base type, not any string | number | symbol', () => {
    expectTypeOf(recordGet<typeof record>)
      .parameter(1)
      .toEqualTypeOf<number>();
  });
});

function declareNumber(use: (value: number) => void): void {
  use(0);
}
