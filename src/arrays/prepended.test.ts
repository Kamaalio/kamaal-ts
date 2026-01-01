import prepended from './prepended';

describe('prepended', () => {
  it('prepends element to empty array', () => {
    const result = prepended([], 1);

    expect(result).toEqual([1]);
  });

  it('prepends element to array with elements', () => {
    const result = prepended([2, 3, 4], 1);

    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('prepends string to array of strings', () => {
    const result = prepended(['b', 'c'], 'a');

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('prepends object to array of objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    const result = prepended([obj2, obj3], obj1);

    expect(result).toEqual([obj1, obj2, obj3]);
  });

  it('does not mutate original array', () => {
    const original = [2, 3, 4];
    const result = prepended(original, 1);

    expect(original).toEqual([2, 3, 4]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('prepends undefined to array', () => {
    const result = prepended([1, 2], undefined);

    expect(result).toEqual([undefined, 1, 2]);
  });

  it('prepends null to array', () => {
    const result = prepended([1, 2], null);

    expect(result).toEqual([null, 1, 2]);
  });
});
