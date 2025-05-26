import {
  Controller,
  Get,
  Query,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FILTER_CONFIG } from 'src/data/filter.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { buildFilterQuery, FilterParams } from 'src/builders/filter.builder';
import {
  ComparatorKey,
  getComparatorSymbolByKey,
} from 'src/helpers/types.converter';
import { fetchAllComponentsBindings } from 'src/fetch/components.fetch';
import { mapBindingsToComponents } from 'src/fetch/component.map';

@Controller('filter')
export class FilterController {
  constructor(private readonly fuseki: FusekiService) {}

  @Get()
  async filter(
    @Query('component') componentKey: string,
    @Query('propertyName') propertyName: string,
    @Query('op') op: ComparatorKey,
    @Query('propertyValue') propertyValue: number,
  ): Promise<Record<string, any>[]> {
    const filterData = FILTER_CONFIG.find(
      (c) => c.componentKey === componentKey && c.propertyName === propertyName,
    );

    if (!filterData) {
      throw new NotFoundException(
        `Not exist a filter for ${componentKey} in ${propertyName}`,
      );
    }

    const params: FilterParams = {
      componentType: filterData.componentType,
      profile: filterData.profile,
      propertyName: filterData.propertyName,
      propertyType: filterData.propertyType,
      comparatorSymbol: getComparatorSymbolByKey(op),
      propertyValue,
    };

    const sparql = buildFilterQuery(params);
    console.log(sparql);

    let uris: string[];
    try {
      const res = await this.fuseki.select(sparql);
      uris = res.results.bindings.map((b) => b.item.value);
    } catch {
      throw new HttpException(
        'Error executing SPARQL filter',
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
        filterData.componentType,
        uris,
        filterData.fieldMappings,
      );
    } catch {
      throw new HttpException(
        `Error retrieving properties for ${componentKey}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const mappedComponents = mapBindingsToComponents(
      rawComponents,
      filterData.fieldMappings,
    );

    return mappedComponents;
  }
}
