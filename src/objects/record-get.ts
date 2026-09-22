type KeyBaseType<Key extends string | number | symbol> = Key extends string
  ? string
  : Key extends number
    ? number
    : symbol;

function isRecordKey<
  RecordType extends Record<string | number | symbol, unknown>,
>(record: RecordType, key: string | number | symbol): key is keyof RecordType {
  return key in record;
}

export function recordGet<
  RecordType extends Record<string | number | symbol, unknown>,
  Key extends keyof RecordType,
>(record: RecordType, key: Key): RecordType[Key];
export function recordGet<
  RecordType extends Record<string | number | symbol, unknown>,
>(
  record: RecordType,
  key: KeyBaseType<keyof RecordType>
): RecordType[keyof RecordType] | undefined;
export function recordGet<
  RecordType extends Record<string | number | symbol, unknown>,
>(
  record: RecordType,
  key: KeyBaseType<keyof RecordType>
): RecordType[keyof RecordType] | undefined {
  return isRecordKey(record, key) ? record[key] : undefined;
}

export default recordGet;
