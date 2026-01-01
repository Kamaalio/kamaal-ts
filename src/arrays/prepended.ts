export function prepended<T>(array: T[], newElement: T): T[] {
  return [newElement].concat(array);
}

export default prepended;
