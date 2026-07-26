function zipEqualized<TargetElement1, TargetElement2>(
  array1: TargetElement1[],
  array2: TargetElement2[]
): Array<[TargetElement1 | undefined, TargetElement2 | undefined]> {
  if (array1.length >= array2.length) {
    return array1.map((item, index) => [item, array2[index]]);
  }

  return array2.map((item, index) => [array1[index], item]);
}

function zipUnequalled<TargetElement1, TargetElement2>(
  array1: TargetElement1[],
  array2: TargetElement2[]
): Array<[TargetElement1, TargetElement2]> {
  if (array1.length >= array2.length) {
    return array2.map((item, index) => [array1[index]!, item]);
  }

  return array1.map((item, index) => [item, array2[index]!]);
}

export function zip<TargetElement1, TargetElement2>(
  array1: TargetElement1[],
  array2: TargetElement2[],
  equalize: true
): Array<[TargetElement1, TargetElement2]>;
export function zip<TargetElement1, TargetElement2>(
  array1: TargetElement1[],
  array2: TargetElement2[],
  equalize?: boolean
): Array<[TargetElement1 | undefined, TargetElement2 | undefined]>;
export function zip<TargetElement1, TargetElement2>(
  array1: TargetElement1[],
  array2: TargetElement2[],
  equalize?: boolean
): Array<[TargetElement1 | undefined, TargetElement2 | undefined]> {
  if (equalize === true) {
    return zipEqualized(array1, array2);
  }

  return zipUnequalled(array1, array2);
}

export default zip;
