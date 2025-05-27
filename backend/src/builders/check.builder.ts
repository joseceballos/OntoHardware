import { ComponentType } from 'src/data/compatibility.config';
import { PREFIXES } from './sparql.prefixes';

export function checkComponentType(
  componentId: string,
  componentType: ComponentType,
): string {
  return `
        PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX onto: <http://www.semanticweb.org/josec/ontologies/2025/3/ontohardware#>

        ASK {
          onto:${componentId} rdf:type onto:${componentType} .
        }
      `;
}

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
