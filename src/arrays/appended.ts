export function appended<T>(array: T[], newElement: T): T[] {
  return array.concat([newElement]);
}

export default appended;
