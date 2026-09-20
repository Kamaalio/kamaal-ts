export function reversedForEach<Item>(
  arr: Item[],
  callback: (value: Item, index: number) => void
): void {
  const length = arr.length;
  for (let index = 0; index < length; index += 1) {
    const reversedIndex = length - index - 1;
    const element = arr[reversedIndex];
    callback(element, reversedIndex);
  }
}

export default reversedForEach;
