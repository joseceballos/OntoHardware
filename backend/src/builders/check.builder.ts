import { PREFIXES } from './sparql.prefixes';

export function buildGetTypeQuery(componentId: string): string {
  return `
    ${PREFIXES}
    SELECT (STRAFTER(STR(?type), "#") AS ?typeName)
    WHERE {
      onto:${componentId} rdf:type ?type .
      FILTER(?type IN (onto:CPU, onto:GPU, onto:Motherboard, onto:RAM))
    }
    LIMIT 1
  `;
}
