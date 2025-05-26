import { FieldMapping } from 'src/mapping/mapper.utils';
import { PREFIXES } from './sparql.prefixes';
import { buildMappingQuery } from './sparql.mapping';

export function buildComponentByIdQuery(
  id: string,
  mappings: FieldMapping[],
): string {
  const sparql = buildMappingQuery(id, mappings);

  return sparql;
}

export function buildComponentsListbyComponentType(
  componentType: string,
): string {
  const sparql = `
    ${PREFIXES}
    SELECT ?item WHERE {
      ?item rdf:type onto:${componentType} .
    }
    ORDER BY ?item`;
  return sparql;
}
