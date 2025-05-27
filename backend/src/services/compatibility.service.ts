import { BadRequestException, Injectable } from '@nestjs/common';
import { checkComponentType } from 'src/builders/check.builder';
import { buildCompatibilityBetweenComponents } from 'src/builders/compatible.builder';
import {
  CheckBuildDto,
  ComponentsChecked,
  IndividualCompatibilityResponse,
} from 'src/data/build.config';
import {
  COMPAT_CONFIG,
  CompatibilityCheck,
  ComponentKey,
} from 'src/data/compatibility.config';
import { fetchComponentResponse } from 'src/fetch/components.fetch';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { getComponentTypeByKey } from 'src/helpers/types.converter';
import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { GPU_FIELD_MAPPINGS } from 'src/mapping/gpu-mapping.config';
import { MB_FIELD_MAPPINGS } from 'src/mapping/mb-mapping.config';
import { PSU_FIELD_MAPPINGS } from 'src/mapping/psu-mapping.config';
import { RAM_FIELD_MAPPINGS } from 'src/mapping/ram-mapping.config';
import { STORAGE_FIELD_MAPPINGS } from 'src/mapping/storage-mapping.config';
import { toCPUResponse } from 'src/responses/cpu.response';
import { toGPUResponse } from 'src/responses/gpu.response';
import { toMBResponse } from 'src/responses/mb.response';
import { toPSUResponse } from 'src/responses/psu.response';
import { toRAMResponse } from 'src/responses/ram.response';
import { toStorageResponse } from 'src/responses/storage.response';

@Injectable()
export class CompatibilityService {
  constructor(private readonly fuseki: FusekiService) {}

  async validateBuildData(
    buildComponents: CheckBuildDto,
  ): Promise<ComponentsChecked> {
    for (const [componentTypeKey, componentId] of Object.entries(
      buildComponents,
    ) as [ComponentKey, string][]) {
      const componentType = getComponentTypeByKey(componentTypeKey);
      const sparql = checkComponentType(componentId, componentType!);

      let exists: boolean;
      try {
        const res = await this.fuseki.ask(sparql);
        exists = res;
      } catch {
        throw new BadRequestException(
          `Error checking existence of "${componentId}".`,
        );
      }

      if (!exists) {
        throw new BadRequestException(
          `${componentId} not exists or not a ${componentType}`,
        );
      }
    }

    const cpu = await fetchComponentResponse(
      this.fuseki,
      buildComponents.cpu,
      'CPU',
      CPU_FIELD_MAPPINGS,
      toCPUResponse,
    );

    const gpu = await fetchComponentResponse(
      this.fuseki,
      buildComponents.gpu,
      'GPU',
      GPU_FIELD_MAPPINGS,
      toGPUResponse,
    );

    const mb = await fetchComponentResponse(
      this.fuseki,
      buildComponents.mb,
      'Motherboard',
      MB_FIELD_MAPPINGS,
      toMBResponse,
    );

    const ram = await fetchComponentResponse(
      this.fuseki,
      buildComponents.ram,
      'RAM',
      RAM_FIELD_MAPPINGS,
      toRAMResponse,
    );

    const psu = await fetchComponentResponse(
      this.fuseki,
      buildComponents.psu,
      'PSU',
      PSU_FIELD_MAPPINGS,
      toPSUResponse,
    );

    const str = await fetchComponentResponse(
      this.fuseki,
      buildComponents.str,
      'Storage',
      STORAGE_FIELD_MAPPINGS,
      toStorageResponse,
    );

    const componentsChecked: ComponentsChecked = {
      cpu,
      gpu,
      mb,
      ram,
      psu,
      str,
    };

    return componentsChecked;
  }

  async checkIndividualRules(
    componentsChecked: ComponentsChecked,
  ): Promise<IndividualCompatibilityResponse> {
    const individualCompatibilityResponse: IndividualCompatibilityResponse = [];
    for (const { components, feature } of COMPAT_CONFIG) {
      const component1Id = componentsChecked[components[0]].id;
      const component2Id = componentsChecked[components[1]].id;

      const sparql = buildCompatibilityBetweenComponents(
        component1Id,
        component2Id,
      );
      console.log(sparql);
      const res = await this.fuseki.ask(sparql);
      const compatibilityCheck: CompatibilityCheck = {
        components: [
          componentsChecked[components[0]],
          componentsChecked[components[1]],
        ],
        feature,
        compatible: res,
      };
      individualCompatibilityResponse.push(compatibilityCheck);
    }
    return individualCompatibilityResponse;
  }
}
