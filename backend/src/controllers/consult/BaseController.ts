import { Get, Param } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import {
  fetchAllComponents,
  fetchComponent,
  fetchComponentList,
} from 'src/fetch/components.fetch';
import { ComponentTypeConfig } from 'src/data/componentType.config';

export abstract class BaseController<T extends Record<string, any>> {
  constructor(
    protected readonly fuseki: FusekiService,
    private readonly componentTypeConfig: ComponentTypeConfig<T>,
  ) {}

  @Get()
  async findAll(): Promise<T[]> {
    const uris = await fetchComponentList(
      this.fuseki,
      this.componentTypeConfig.componentType,
    );

    const componentResponses = await fetchAllComponents(
      this.fuseki,
      uris,
      this.componentTypeConfig,
    );

    return componentResponses;
  }

  @Get(`:id`)
  async findOne(@Param('id') id: string): Promise<T> {
    const componentResponse = await fetchComponent(
      this.fuseki,
      id,
      this.componentTypeConfig,
    );
    return componentResponse;
  }
}
