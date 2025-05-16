import { PREFIXES } from './sparql.prefixes';

export function buildNumericFilterQuery(
  componentType: string,
  profilePath: string | null,
  filterProperty: string,
  filterValue: number,
  comparisonSymbol: '>' | '<' | '>=' | '<=' | '=',
  opts: {
    valueVar?: string;
    isInteger?: boolean;
  } = {},
): string {
  const { valueVar = 'valRaw', isInteger = true } = opts;
  const numType = isInteger ? 'integer' : 'decimal';

  const select = `
    ?item
    ${profilePath ? '?profile' : ''}
    (xsd:${numType}(str(?${valueVar})) AS ?value)
    (STRAFTER(STR(?item), "#") AS ?id)`;

  const where = profilePath
    ? `
      ?item rdf:type onto:${componentType} ;
        onto:has${profilePath} ?profile .
      ?profile onto:${filterProperty} ?${valueVar} .`
    : `
      ?item rdf:type onto:${componentType} ;
        onto:${filterProperty} ?${valueVar} .`;

  const filter = `
    xsd:${numType}(str(?${valueVar})) ${comparisonSymbol} ${filterValue}`;

  return `
    ${PREFIXES}
    SELECT
      ${select}
    WHERE {
      ${where}
      FILTER(${filter})
    }
    ORDER BY DESC(?value)  
  `;
}
