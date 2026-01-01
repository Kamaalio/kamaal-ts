import appended from './appended';

describe('appended', () => {
  it('appends element to empty array', () => {
    const result = appended([], 1);

    expect(result).toEqual([1]);
  });

  it('appends element to array with elements', () => {
    const result = appended([1, 2, 3], 4);

    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('appends string to array of strings', () => {
    const result = appended(['a', 'b'], 'c');

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('appends object to array of objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    const result = appended([obj1, obj2], obj3);

    expect(result).toEqual([obj1, obj2, obj3]);
  });

  it('does not mutate original array', () => {
    const original = [1, 2, 3];
    const result = appended(original, 4);

    expect(original).toEqual([1, 2, 3]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('appends undefined to array', () => {
    const result = appended([1, 2], undefined);

    expect(result).toEqual([1, 2, undefined]);
  });

  it('appends null to array', () => {
    const result = appended([1, 2], null);

    expect(result).toEqual([1, 2, null]);
  });
});
