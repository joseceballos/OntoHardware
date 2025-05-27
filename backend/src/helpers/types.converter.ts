import { ComponentKey, ComponentType } from 'src/data/compatibility.config';
import { FieldMapping } from 'src/mapping/mapper.utils';

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
    psu: 'PSU',
    str: 'Storage',
  };
  if (componentKey) {
    return COMPONENTTYPE_MAP[componentKey];
  } else {
    return undefined;
  }
}

export function getComponentKeyByType(
  componentType: ComponentType,
): ComponentKey | undefined {
  const TYPEKEY_MAP: Record<ComponentType, ComponentKey> = {
    CPU: 'cpu',
    Motherboard: 'mb',
    GPU: 'gpu',
    RAM: 'ram',
    PSU: 'psu',
    Storage: 'str',
  };
  if (componentType) {
    return TYPEKEY_MAP[componentType];
  } else {
    return undefined;
  }
}

export function getPropertyTypedFromRawValue(
  mapping: FieldMapping,
  rawValue: string,
): number | string {
  const { type } = mapping;

  if (type === 'integer') {
    return parseInt(rawValue);
  }

  if (type === 'decimal') {
    return parseFloat(rawValue);
  }

  return rawValue;
}

export function assertString(field: unknown, name: string): string {
  if (typeof field !== 'string') {
    throw new Error(`Expected ${name} to be string, got ${typeof field}`);
  }
  return field;
}

export function assertNumber(field: unknown, name: string): number {
  if (typeof field !== 'number') {
    throw new Error(`Expected ${name} to be number, got ${typeof field}`);
  }
  return field;
}
