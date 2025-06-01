import { Controller, Body, Post } from '@nestjs/common';
import { ComponentResponse } from 'src/data/compatibility.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import {
  fetchAllComponents,
  fetchCompatibilityCheck,
  fetchCompatibilityList,
} from 'src/fetch/components.fetch';
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

    const uris = await fetchCompatibilityList(
      this.fuseki,
      componentId,
      componentKey,
    );

    const componentResponses = await fetchAllComponents<ComponentResponse>(
      this.fuseki,
      uris,
      componentTypeConfig,
    );
    return componentResponses;
  }

  @Post('check')
  async checkCompatibleComponents(
    @Body() checkCompatibilityData: CompatibleComponentstDto,
  ): Promise<{ compatible: boolean }> {
    const { component1Id, component2Id } = checkCompatibilityData;
    const compatible = fetchCompatibilityCheck(
      this.fuseki,
      component1Id,
      component2Id,
    );
    return compatible;
  }
}
