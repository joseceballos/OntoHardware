import { Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { FieldMapping } from 'src/mapping/mapper.utils';
import { applyMapping } from 'src/mapping/mapper.utils';
import { buildComponentsListbyComponentType } from 'src/builders/consult.builder';
import { mapBindingsToComponents } from 'src/fetch/component.map';
import {
  fetchAllComponentsBindings,
  fetchComponentBindings,
} from 'src/fetch/components.fetch';

export abstract class BaseController<T extends Record<string, any>> {
  constructor(
    protected readonly fuseki: FusekiService,
    private readonly componentType: string,
    private readonly mappings: FieldMapping[],
  ) {}

  @Get()
  async findAll(): Promise<T[]> {
    const sparql = buildComponentsListbyComponentType(this.componentType);
    let uris: string[];
    try {
      const res = await this.fuseki.select(sparql);
      uris = res.results.bindings.map((b) => b.item.value);
    } catch {
      throw new HttpException('Error listing items', HttpStatus.BAD_GATEWAY);
    }

    const rawComponents = await fetchAllComponentsBindings(
      this.fuseki,
      this.componentType,
      uris,
      this.mappings,
    );

    const mappedResults = mapBindingsToComponents<T>(
      rawComponents,
      this.mappings,
    );

    return mappedResults;
  }

  @Get(`:id`)
  async findOne(@Param('id') id: string): Promise<T> {
    const binding = await fetchComponentBindings(
      this.fuseki,
      id,
      this.componentType,
      this.mappings,
    );

    const mappedComponent = applyMapping<T>(id, binding, this.mappings);
    return mappedComponent;
  }
}
