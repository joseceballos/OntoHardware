import { ComponentKey, ComponentType } from 'src/data/compatibility.config';

export type ComparatorKey = 'gt' | 'lt' | 'ge' | 'le' | 'eq';
export type ComparatorSymbol = '>' | '<' | '>=' | '<=' | '=';

export function getComparatorSymbolByKey(
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

export function getComponentTypeByKey(
  componentKey: ComponentKey,
): ComponentType | undefined {
  const COMPONENTTYPE_MAP: Record<ComponentKey, ComponentType> = {
    cpu: 'CPU',
    mb: 'Motherboard',
    gpu: 'GPU',
    ram: 'RAM',
  };
  if (componentKey) {
    return COMPONENTTYPE_MAP[componentKey];
  } else {
    return undefined;
  }
}
