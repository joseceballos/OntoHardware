import {
  Controller,
  NotFoundException,
  HttpException,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { FILTER_CONFIG } from 'src/data/filter.config';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { buildFilterQuery, FilterParams } from 'src/builders/filter.builder';
import { getComparatorSymbolByKey } from 'src/helpers/types.converter';
import { fetchAllComponents } from 'src/fetch/components.fetch';
import { FilterDto } from 'src/dto/filter.dto';

@Controller('filter')
export class FilterController {
  constructor(private readonly fuseki: FusekiService) {}

  @Post()
  async filter(
    @Body() filterComponents: FilterDto,
  ): Promise<Record<string, any>[]> {
    const { componentKey, propertyName, propertyValue, op } = filterComponents;

    const filterData = FILTER_CONFIG.find(
      (c) =>
        c.componentTypeConfig.componentKey === componentKey &&
        c.propertyName === propertyName,
    );

    if (!filterData) {
      throw new NotFoundException(
        `Not exist a filter for ${componentKey} in ${propertyName}`,
      );
    }

    const params: FilterParams = {
      componentType: filterData.componentTypeConfig.componentType,
      profile: filterData.profile,
      propertyName: filterData.propertyName,
      propertyType: filterData.propertyType,
      comparatorSymbol: getComparatorSymbolByKey(op),
      propertyValue,
    };

    const sparql = buildFilterQuery(params);

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

    try {
      const componentResponses = await fetchAllComponents(
        this.fuseki,
        uris,
        filterData.componentTypeConfig,
      );
      return componentResponses;
    } catch {
      throw new HttpException(
        `Error retrieving properties for ${componentKey}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
