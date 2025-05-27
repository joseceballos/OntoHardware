import { HttpException, HttpStatus } from '@nestjs/common';
import { buildMappingQuery } from 'src/builders/sparql.mapping';
import { ComponentType } from 'src/data/compatibility.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { applyMapping, FieldMapping } from 'src/mapping/mapper.utils';

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

export async function fetchComponentResponse<T>(
  fuseki: FusekiService,
  componentId: string,
  componentType: ComponentType,
  mappings: FieldMapping[],
  convertToResponseFn: (raw: Record<string, any>) => T,
): Promise<T> {
  const rawComponent = await fetchComponentBindings(
    fuseki,
    componentId,
    componentType,
    mappings,
  );

  const mappedComponent = applyMapping(componentId, rawComponent, mappings);
  const componentResponse = convertToResponseFn(mappedComponent);

  return componentResponse;
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
      const binding = await fetchComponentBindings(
        fuseki,
        id,
        componentType,
        mappings,
      );
      return { id, binding };
    }),
  );
}
