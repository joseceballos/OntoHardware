import { ComponentType } from 'src/data/compatibility.config';
import { PREFIXES } from './sparql.prefixes';

export function buildCompatibilityListWithComponentTypeQuery(
  componentId: string,
  targetFamilyId: ComponentType,
): string {
  return `
    ${PREFIXES}
    SELECT
      ?targetComponent
      (STRAFTER(STR(?targetComponent), "#") AS ?targetComponentId)
      WHERE {
        onto:${componentId} onto:compatibleWith ?targetComponent .
        ?targetComponent rdf:type onto:${targetFamilyId} .
      }
      ORDER by ?targetComponentId`;
}

export function buildCompatibilityBetweenComponents(
  component1Id: string,
  component2Id: string,
): string {
  return `
    ${PREFIXES}
    ASK {
      onto:${component1Id} onto:compatibleWith onto:${component2Id} .
    }`;
}
