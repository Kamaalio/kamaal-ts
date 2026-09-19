import median from './median';

describe('median', () => {
  it.each([
    { values: [3, 1, 2], expected: 2 },
    { values: [1], expected: 1 },
    { values: [1, 2, 3, 4], expected: 2 },
  ])('returns $expected for values $values', ({ values, expected }) => {
    const result = median(values);
    expect(result).toEqual(expected);
  });

  it('does not mutate the input array', () => {
    const values = [3, 1, 2];
    median(values);
    expect(values).toEqual([3, 1, 2]);
  });

  it('returns undefined when no values are passed in', () => {
    const result = median([]);
    expect(result).toBeUndefined();
  });
});
