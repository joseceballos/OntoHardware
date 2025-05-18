export type ComparatorKey = 'gt' | 'lt' | 'ge' | 'le' | 'eq';
export type ComparatorSymbol = '>' | '<' | '>=' | '<=' | '=';

export function comparatorKeyIntoComparatorSymbol(
  key: ComparatorKey | undefined,
): ComparatorSymbol | undefined {
  const COMPARATOR_MAP: Record<ComparatorKey, ComparatorSymbol> = {
    gt: '>',
    lt: '<',
    ge: '>=',
    le: '<=',
    eq: '=',
  };
  if (key) {
    return COMPARATOR_MAP[key];
  } else {
    return undefined;
  }
}
