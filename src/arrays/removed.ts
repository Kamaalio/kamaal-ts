export function removed<T>(array: T[], index: number): T[] {
  if (index < array.length) {
    const newArray = [...array];
    newArray.splice(index, 1);

    return newArray;
  }

  return array;
}

export default removed;
