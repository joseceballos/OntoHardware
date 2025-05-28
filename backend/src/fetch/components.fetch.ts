import { HttpException, HttpStatus } from '@nestjs/common';
import { buildComponentByIdQuery } from 'src/builders/consult.builder';
import { ComponentTypeConfig } from 'src/data/componentType.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { applyMapping } from 'src/mapping/mapper.utils';

export async function fetchComponent<T>(
  fuseki: FusekiService,
  componentId: string,
  componentTypeConfig: ComponentTypeConfig<T>,
): Promise<T> {
  const { componentKey, componentType, fieldMappings, convertToResponse } =
    componentTypeConfig;

  const sparql = buildComponentByIdQuery(componentId, fieldMappings);

  let binding: Record<string, { value: string }>;
  try {
    const res = await fuseki.select(sparql);
    binding = res.results.bindings[0];
    if (!binding) {
      throw new HttpException(
        `No properties found for ${componentType}/${componentId}`,
        HttpStatus.NOT_FOUND,
      );
    }
  } catch {
    throw new HttpException(
      `Error retrieving ${componentType}/${componentId}`,
      HttpStatus.BAD_GATEWAY,
    );
  }

  let rawComponent: Record<string, string | number>;
  try {
    rawComponent = applyMapping<Record<string, string | number>>(
      componentId,
      binding,
      fieldMappings,
    );
  } catch {
    throw new HttpException(
      `Error Mapping ${componentType}/${componentId}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  try {
    const componentResponse = convertToResponse(rawComponent);
    return componentResponse;
  } catch {
    throw new HttpException(
      `Error converting ${componentKey}/${componentId}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function fetchAllComponents<T>(
  fuseki: FusekiService,
  uris: string[],
  componentTypeConfig: ComponentTypeConfig<T>,
): Promise<T[]> {
  const componentResponses = Promise.all(
    uris.map(async (uri) => {
      const componentId = uri.split('#').pop()!;
      try {
        const componentResponse = await fetchComponent<T>(
          fuseki,
          componentId,
          componentTypeConfig,
        );
        return componentResponse;
      } catch {
        throw new HttpException(
          `Error fetching ${componentTypeConfig.componentType}/${componentId}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }),
  );
  return componentResponses;
}
