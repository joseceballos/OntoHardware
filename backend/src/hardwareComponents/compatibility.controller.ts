import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  CompatibilityRuleType,
  ComponentKey,
  ComponentType,
  getRulesByComponentType,
} from 'src/data/compatibility.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { buildGetTypeQuery } from 'src/helpers/check.builder';
import {
  buildCompatibilityBetweenComponents,
  buildCompatibilityListWithComponentTypeQuery,
} from 'src/helpers/compatible.builder';
import { getComponentTypeByKey } from 'src/helpers/types.converter';

@Controller('compatible')
export class CompatibilityController {
  constructor(private readonly fuseki: FusekiService) {}

  @Get('list')
  async compatiblesComponentsList(
    @Query('componentId') componentId: string,
    @Query('familyKey') familyKey: string,
  ): Promise<string[]> {
    const targetFamilyId = getComponentTypeByKey(familyKey as ComponentKey);

    if (targetFamilyId === undefined) {
      throw new BadRequestException(`${familyKey} not exist`);
    }

    const componentsCompatiblesRes = await this.fuseki.select(
      buildCompatibilityListWithComponentTypeQuery(componentId, targetFamilyId),
    );

    if (componentsCompatiblesRes.results.bindings.length === 0) {
      throw new NotFoundException(
        `Not exist compatible components for ${componentId}`,
      );
    }

    console.log(componentsCompatiblesRes.results.bindings);

    return componentsCompatiblesRes.results.bindings.map((b) => {
      return b.targetComponentId.value;
    });
  }

  @Get('check')
  async checkCompatibleComponents(
    @Query('component1Id') component1Id: string,
    @Query('component2Id') component2Id: string,
  ): Promise<{ compatible: boolean }> {
    const compatibleRes = await this.fuseki.ask(
      buildCompatibilityBetweenComponents(component1Id, component2Id),
    );
    return { compatible: compatibleRes };
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
