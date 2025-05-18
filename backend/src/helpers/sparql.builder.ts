import { PREFIXES } from './sparql.prefixes';
import { ComparatorSymbol } from './types.converter';

export type PropertyType = 'integer' | 'decimal' | 'string' | 'objectId';

export interface FilterParams {
  componentType: string;
  profile: string | null;
  propertyName: string;
  propertyType: PropertyType;
  comparatorSymbol?: ComparatorSymbol;
  propertyValue: string | number;
}

export function buildFilterQuery(params: FilterParams): string {
  if (params.propertyType === 'objectId') {
    return buildObjectFilterQuery(params);
  } else {
    return buildDataFilterQuery(params);
  }
}

function buildObjectFilterQuery(params: FilterParams): string {
  const { componentType, profile, propertyName, propertyValue } = params;

  const select = `
    ?item
    ${profile ? '?profile' : ''}
    (STRAFTER(STR(?item), "#") AS ?id)`;

  const where = profile
    ? `
      ?item rdf:type onto:${componentType} ;
        onto:has${profile} ?profile .
      ?profile onto:has${propertyName} ?valObject .`
    : `
      ?item rdf:type onto:${componentType} ;
        onto:has${propertyName} ?valObject .`;

  const filter = `FILTER(?valObject = onto:${propertyValue})`;

  return `
    ${PREFIXES}
    SELECT
      ${select}
    WHERE {
      ${where}
      ${filter}
    }
    ORDER BY ?item`;
}

function buildDataFilterQuery(params: FilterParams): string {
  const {
    componentType,
    profile,
    propertyName,
    propertyValue,
    propertyType,
    comparatorSymbol,
  } = params;

  let selectType: string;
  let filter: string;

  if (['integer', 'decimal'].includes(propertyType)) {
    selectType = `(xsd:${propertyType}(str(?valRaw)) AS ?value)`;
    filter = `FILTER(xsd:${propertyType}(str(?valRaw)) ${comparatorSymbol} ${propertyValue})`;
  } else {
    selectType = `((str(?valRaw)) AS ?value)`;
    filter = `FILTER(str(?valRaw) ${comparatorSymbol} ${propertyValue})`;
  }

  const select = `?item
    ${profile ? '?profile' : ''}
    ${selectType}
    (STRAFTER(STR(?item), "#") AS ?id)`;

  const where = profile
    ? `
      ?item rdf:type onto:${componentType} ;
        onto:has${profile} ?profile .
      ?profile onto:${propertyName} ?valRaw .`
    : `
      ?item rdf:type onto:${componentType} ;
        onto:${propertyName} ?valRaw .`;

  return `
    ${PREFIXES}
    SELECT
      ${select}
    WHERE {
      ${where}
      ${filter}
    }
    ORDER BY DESC(?value)  
  `;
}
