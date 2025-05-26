import { HttpException, HttpStatus } from '@nestjs/common';
import { buildMappingQuery } from 'src/builders/sparql.mapping';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { FieldMapping } from 'src/mapping/mapper.utils';

export async function fetchComponentBindings(
  fuseki: FusekiService,
  id: string,
  componentType: string,
  mappings: FieldMapping[],
): Promise<Record<string, { value: string }>> {
  const sparql = buildMappingQuery(id, mappings);
  let binding: Record<string, { value: string }>;

  try {
    const res = await fuseki.select(sparql);
    if (!res.results.bindings.length) {
      throw new HttpException(
        `No properties found for ${componentType}/${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    binding = res.results.bindings[0];
    return binding;
  } catch {
    throw new HttpException(
      `Error retrieving ${componentType}/${id}`,
      HttpStatus.BAD_GATEWAY,
    );
  }
}

export async function fetchAllComponentsBindings(
  fuseki: FusekiService,
  componentType: string,
  uris: string[],
  mappings: FieldMapping[],
): Promise<Array<{ id: string; binding: Record<string, { value: string }> }>> {
  return Promise.all(
    uris.map(async (uri) => {
      const id = uri.split('#').pop()!;
      console.log(id);
      const binding = await fetchComponentBindings(
        fuseki,
        id,
        componentType,
        mappings,
      );
      console.log(binding);
      return { id, binding };
    }),
  );
}
