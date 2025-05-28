import { BadRequestException, Injectable } from '@nestjs/common';
import { buildCheckComponentType } from 'src/builders/check.builder';
import { buildCompatibilityBetweenComponents } from 'src/builders/compatible.builder';
import {
  ComponentsChecked,
  IndividualCompatibilityResponse,
} from 'src/data/build.config';
import {
  COMPAT_CONFIG,
  CompatibilityCheck,
} from 'src/data/compatibility.config';
import {
  ComponentKey,
  COMPONENTS_TYPES_CONFIG,
} from 'src/data/componentType.config';
import { CheckBuildDto } from 'src/dto/checkBuild.dto';
import { fetchComponent } from 'src/fetch/components.fetch';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { getComponentTypeByKey } from 'src/helpers/types.converter';

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
      const sparql = buildCheckComponentType(componentId, componentType!);

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

    const cpu = await fetchComponent(
      this.fuseki,
      buildComponents.cpu,
      COMPONENTS_TYPES_CONFIG.cpu,
    );

    const gpu = await fetchComponent(
      this.fuseki,
      buildComponents.gpu,
      COMPONENTS_TYPES_CONFIG.gpu,
    );

    const mb = await fetchComponent(
      this.fuseki,
      buildComponents.mb,
      COMPONENTS_TYPES_CONFIG.mb,
    );

    const ram = await fetchComponent(
      this.fuseki,
      buildComponents.ram,
      COMPONENTS_TYPES_CONFIG.ram,
    );

    const psu = await fetchComponent(
      this.fuseki,
      buildComponents.psu,
      COMPONENTS_TYPES_CONFIG.psu,
    );

    const str = await fetchComponent(
      this.fuseki,
      buildComponents.str,
      COMPONENTS_TYPES_CONFIG.str,
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
