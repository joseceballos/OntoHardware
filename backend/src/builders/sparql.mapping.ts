import { FieldMappings } from 'src/mapping/field-mapping.config';
import { PREFIXES } from './sparql.prefixes';

export function buildMappingQuery(id: string, mappings: FieldMappings): string {
  const select = buildMappingSelect(mappings);
  const base = buildMappingBase(id, mappings);
  const optional = buildMappingOptional(id, mappings);

  const sparql = `
      ${PREFIXES}
      SELECT  
        ${select}
      WHERE {
        ${base}
        ${optional}
      }`;

  return sparql;
}

function buildMappingSelect(mappings: FieldMappings): string {
  return mappings
    .map((m) => (m.type === 'objectId' ? `?${m.key}Name` : `?${m.key}Val`))
    .join('\n');
}

function buildMappingBase(id: string, mappings: FieldMappings): string {
  return mappings
    .filter((m) => m.type !== 'objectId')
    .map((m) => {
      if (m.path && m.path.length > 0) {
        const pathToProperty = [...m.path, m.uri]
          .map((p) => `onto:${p}`)
          .join('/');
        return `onto:${id} ${pathToProperty} ?${m.key}Val .`;
      }
      return `onto:${id} onto:${m.uri} ?${m.key}Val .`;
    })
    .join('\n');
}

function buildMappingOptional(id: string, mappings: FieldMappings): string {
  return mappings
    .filter((m) => m.type === 'objectId')
    .map((m) => {
      let pathToProperty;
      let sparql: string;

      if (m.path && m.path.length > 0) {
        pathToProperty = [...m.path, m.uri].map((p) => `onto:${p}`).join('/');
        sparql = `
          OPTIONAL {
            onto:${id} ${pathToProperty}/onto:valueTypeName ?${m.key}Name .
          }`;
      } else {
        pathToProperty = `onto:${m.uri}`;
        sparql = `
          OPTIONAL {
            onto:${id} ${pathToProperty}/onto:valueTypeName ?${m.key}Name .
          }`;
      }

      return sparql;
    })
    .join('');
}
