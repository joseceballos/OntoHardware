import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import {
  buildCompatibilityBetweenComponents,
  buildCompatibilityListWithComponentTypeQuery,
} from 'src/builders/compatible.builder';
import {
  buildComponentByIdQuery,
  buildComponentsListbyComponentType,
} from 'src/builders/consult.builder';
import { buildFilterQuery, FilterParams } from 'src/builders/filter.builder';
import {
  ComponentKey,
  ComponentType,
  ComponentTypeConfig,
} from 'src/data/componentType.config';
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

export async function fetchComponentList(
  fuseki: FusekiService,
  componentType: ComponentType,
): Promise<string[]> {
  const sparql = buildComponentsListbyComponentType(componentType);
  try {
    const res = await fuseki.select(sparql);
    const uris = res.results.bindings.map((b) => b.item.value);
    return uris;
  } catch {
    throw new HttpException('Error listing items', HttpStatus.BAD_GATEWAY);
  }
}

export async function fetchFilterComponentList(
  fuseki: FusekiService,
  params: FilterParams,
): Promise<string[]> {
  const sparql = buildFilterQuery(params);
  try {
    const res = await fuseki.select(sparql);
    const uris = res.results.bindings.map((b) => b.item.value);
    return uris;
  } catch {
    throw new HttpException(
      'Error executing SPARQL filter',
      HttpStatus.BAD_GATEWAY,
    );
  }
}

export async function fetchCompatibilityList(
  fuseki: FusekiService,
  componentId: string,
  componentKey: ComponentKey,
): Promise<string[]> {
  const sparql = buildCompatibilityListWithComponentTypeQuery(
    componentId,
    componentKey,
  );

  try {
    const res = await fuseki.select(sparql);
    if (res.results.bindings.length === 0) {
      throw new NotFoundException(
        `Not exist compatible components for ${componentId}`,
      );
    }
    const uris = res.results.bindings.map((b) => b.targetComponentId.value);
    return uris;
  } catch {
    throw new HttpException(
      'Error executing compatibility',
      HttpStatus.BAD_GATEWAY,
    );
  }
}

export async function fetchCompatibilityCheck(
  fuseki: FusekiService,
  component1Id: string,
  component2Id: string,
): Promise<{ compatible: boolean }> {
  const sparql = buildCompatibilityBetweenComponents(
    component1Id,
    component2Id,
  );
  try {
    const res = await fuseki.ask(sparql);
    return { compatible: res };
  } catch {
    throw new HttpException(
      'Error executing compatibility check',
      HttpStatus.BAD_GATEWAY,
    );
  }
}
