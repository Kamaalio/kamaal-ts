import removed from './removed';

describe('removed', () => {
  it('removes element at index 0', () => {
    const result = removed([1, 2, 3], 0);

    expect(result).toEqual([2, 3]);
  });

  it('removes element at middle index', () => {
    const result = removed([1, 2, 3, 4], 2);

    expect(result).toEqual([1, 2, 4]);
  });

  it('removes element at last index', () => {
    const result = removed([1, 2, 3], 2);

    expect(result).toEqual([1, 2]);
  });

  it('removes only element from single-element array', () => {
    const result = removed([1], 0);

    expect(result).toEqual([]);
  });

  it('returns original array when index is out of bounds', () => {
    const original = [1, 2, 3];
    const result = removed(original, 5);

    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(original);
  });

  it('removes element when index is negative (splice behavior)', () => {
    const original = [1, 2, 3];
    const result = removed(original, -1);

    expect(result).toEqual([1, 2]);
    expect(original).toEqual([1, 2, 3]);
  });

  it('does not mutate original array when removing element', () => {
    const original = [1, 2, 3, 4];
    const result = removed(original, 1);

    expect(original).toEqual([1, 2, 3, 4]);
    expect(result).toEqual([1, 3, 4]);
  });

  it('removes element from array of strings', () => {
    const result = removed(['a', 'b', 'c'], 1);

    expect(result).toEqual(['a', 'c']);
  });

  it('removes element from array of objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    const result = removed([obj1, obj2, obj3], 1);

    expect(result).toEqual([obj1, obj3]);
  });

  it('handles empty array', () => {
    const result = removed([], 0);

    expect(result).toEqual([]);
  });
});
