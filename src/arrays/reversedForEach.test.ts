import reversedForEach from './reversedForEach';

describe('reversedForEach', () => {
  it('iterates over elements in reverse order', () => {
    const visited: number[] = [];

    reversedForEach([1, 2, 3, 4], (value) => {
      visited.push(value);
    });

    expect(visited).toEqual([4, 3, 2, 1]);
  });

  it('passes the original index of each element', () => {
    const visited: number[] = [];

    reversedForEach(['a', 'b', 'c'], (_value, index) => {
      visited.push(index);
    });

    expect(visited).toEqual([2, 1, 0]);
  });

  it('does nothing on an empty array', () => {
    const callback = vi.fn();

    reversedForEach([], callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it('calls the callback once for a single element array', () => {
    const visited: Array<{ value: number; index: number }> = [];

    reversedForEach([42], (value, index) => {
      visited.push({ value, index });
    });

    expect(visited).toEqual([{ value: 42, index: 0 }]);
  });
});
