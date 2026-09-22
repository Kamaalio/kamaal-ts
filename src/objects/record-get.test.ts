import recordGet from './record-get';

describe('recordGet', () => {
  it('returns the value for a key that exists in the record', () => {
    const result = recordGet({ yes: true, no: false }, 'yes');
    expect(result).toEqual(true);
  });

  it('returns undefined for a key that does not exist in the record', () => {
    const record = { yes: true, no: false };
    const result = recordGet(record, 'maybe');
    expect(result).toBeUndefined();
  });

  it('returns the value for a numeric key that exists in the record', () => {
    const result = recordGet({ 0: 'zero', 1: 'one' }, 0);
    expect(result).toEqual('zero');
  });

  it('returns undefined for a numeric key that does not exist in the record', () => {
    const record = { 0: 'zero', 1: 'one' };
    const result = recordGet(record, 2);
    expect(result).toBeUndefined();
  });

  it('returns the inherited value for a key present on the prototype chain', () => {
    const record = { yes: true };
    const result = recordGet(record, 'toString');
    expect(typeof result).toEqual('function');
  });
});
