import { Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { buildComponentsListbyComponentType } from 'src/builders/consult.builder';
import { fetchAllComponents, fetchComponent } from 'src/fetch/components.fetch';
import { ComponentTypeConfig } from 'src/data/componentType.config';

export abstract class BaseController<T extends Record<string, any>> {
  constructor(
    protected readonly fuseki: FusekiService,
    private readonly componentTypeConfig: ComponentTypeConfig<T>,
  ) {}

  @Get()
  async findAll(): Promise<T[]> {
    const sparql = buildComponentsListbyComponentType(
      this.componentTypeConfig.componentType,
    );
    let uris: string[];
    try {
      const res = await this.fuseki.select(sparql);
      uris = res.results.bindings.map((b) => b.item.value);
    } catch {
      throw new HttpException('Error listing items', HttpStatus.BAD_GATEWAY);
    }

    try {
      const componentResponses = await fetchAllComponents(
        this.fuseki,
        uris,
        this.componentTypeConfig,
      );

      return componentResponses;
    } catch {
      throw new HttpException(
        `Error fetching all ${this.componentTypeConfig.componentType}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(`:id`)
  async findOne(@Param('id') id: string): Promise<T> {
    try {
      const componentResponse = await fetchComponent(
        this.fuseki,
        id,
        this.componentTypeConfig,
      );
      return componentResponse;
    } catch {
      throw new HttpException(
        `Error fetching ${this.componentTypeConfig.componentType}/${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
