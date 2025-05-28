import { ComponentKey } from 'src/data/componentType.config';
import { PREFIXES } from './sparql.prefixes';
import { getComponentTypeByKey } from 'src/helpers/types.converter';

export function buildCompatibilityListWithComponentTypeQuery(
  componentId: string,
  componentKey: ComponentKey,
): string {
  return `
    ${PREFIXES}
    SELECT
      ?targetComponent
      (STRAFTER(STR(?targetComponent), "#") AS ?targetComponentId)
      WHERE {
        onto:${componentId} onto:compatibleWith ?targetComponent .
        ?targetComponent rdf:type onto:${getComponentTypeByKey(componentKey)} .
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
