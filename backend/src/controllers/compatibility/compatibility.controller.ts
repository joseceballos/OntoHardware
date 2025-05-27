import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  COMPATIBILITY_MAPPINGS,
  CompatibilityRuleType,
  ComponentKey,
  ComponentType,
  getRulesByComponentType,
} from 'src/data/compatibility.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { buildGetTypeQuery } from 'src/builders/check.builder';
import {
  buildCompatibilityBetweenComponents,
  buildCompatibilityListWithComponentTypeQuery,
} from 'src/builders/compatible.builder';
import { getComponentTypeByKey } from 'src/helpers/types.converter';
import { mapBindingsToComponents } from 'src/fetch/component.map';
import { fetchAllComponentsBindings } from 'src/fetch/components.fetch';

@Controller('compatible')
export class CompatibilityController {
  constructor(private readonly fuseki: FusekiService) {}

  @Get('list')
  async compatiblesComponentsList(
    @Query('componentId') componentId: string,
    @Query('familyKey') familyKey: string,
  ): Promise<Record<string, any>[]> {
    const targetFamilyId = getComponentTypeByKey(familyKey as ComponentKey);

    if (targetFamilyId === undefined) {
      throw new BadRequestException(`${familyKey} not exist`);
    }

    const mappings = COMPATIBILITY_MAPPINGS[familyKey as ComponentKey];

    const sparql = buildCompatibilityListWithComponentTypeQuery(
      componentId,
      targetFamilyId,
    );

    let uris: string[];
    try {
      const res = await this.fuseki.select(sparql);
      if (res.results.bindings.length === 0) {
        throw new NotFoundException(
          `Not exist compatible components for ${componentId}`,
        );
      }
      uris = res.results.bindings.map((b) => b.targetComponentId.value);
    } catch {
      throw new HttpException(
        'Error executing compatibility',
        HttpStatus.BAD_GATEWAY,
      );
    }

    let rawComponents: Array<{
      id: string;
      binding: Record<string, { value: string }>;
    }>;
    try {
      rawComponents = await fetchAllComponentsBindings(
        this.fuseki,
        targetFamilyId,
        uris,
        mappings,
      );
    } catch {
      throw new HttpException(
        `Error retrieving properties for ${familyKey}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const mappedComponents = mapBindingsToComponents(rawComponents, mappings);

    return mappedComponents;
  }

  @Get('check')
  async checkCompatibleComponents(
    @Query('component1Id') component1Id: string,
    @Query('component2Id') component2Id: string,
  ): Promise<{ compatible: boolean }> {
    const sparql = buildCompatibilityBetweenComponents(
      component1Id,
      component2Id,
    );
    const res = await this.fuseki.ask(sparql);
    return { compatible: res };
  }

  @Get(':componentId')
  async compatiblesRules(
    @Param('componentId') componentId: string,
  ): Promise<CompatibilityRuleType[]> {
    const componentTypeRes = await this.fuseki.select(
      buildGetTypeQuery(componentId),
    );

    if (componentTypeRes.results.bindings.length === 0) {
      throw new NotFoundException(`Not exist the component ${componentId}`);
    }

    const binding = componentTypeRes.results.bindings[0];
    const compatibleRules = getRulesByComponentType(
      binding.typeName.value as ComponentType,
    );

    return compatibleRules;
  }
}
