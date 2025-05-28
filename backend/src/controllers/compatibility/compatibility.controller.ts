import {
  Controller,
  NotFoundException,
  HttpException,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { ComponentResponse } from 'src/data/compatibility.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import {
  buildCompatibilityBetweenComponents,
  buildCompatibilityListWithComponentTypeQuery,
} from 'src/builders/compatible.builder';
import { fetchAllComponents } from 'src/fetch/components.fetch';
import { COMPONENTS_TYPES_CONFIG } from 'src/data/componentType.config';
import { CompatibleListDto } from 'src/dto/compatibleList.dto';
import { CompatibleComponentstDto } from 'src/dto/compatibleComponents.dto';

@Controller('compatible')
export class CompatibilityController {
  constructor(private readonly fuseki: FusekiService) {}

  @Post('list')
  async compatiblesComponentsList(
    @Body() compatibleListData: CompatibleListDto,
  ): Promise<ComponentResponse[]> {
    const { componentId, componentKey } = compatibleListData;
    const componentTypeConfig = COMPONENTS_TYPES_CONFIG[componentKey];

    const sparql = buildCompatibilityListWithComponentTypeQuery(
      componentId,
      componentKey,
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

    try {
      const componentResponses = await fetchAllComponents<ComponentResponse>(
        this.fuseki,
        uris,
        componentTypeConfig,
      );
      return componentResponses;
    } catch {
      throw new HttpException(
        `Error retrieving properties for ${componentKey}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('check')
  async checkCompatibleComponents(
    @Body() checkCompatibilityData: CompatibleComponentstDto,
  ): Promise<{ compatible: boolean }> {
    const { component1Id, component2Id } = checkCompatibilityData;
    const sparql = buildCompatibilityBetweenComponents(
      component1Id,
      component2Id,
    );
    const res = await this.fuseki.ask(sparql);
    return { compatible: res };
  }
}
