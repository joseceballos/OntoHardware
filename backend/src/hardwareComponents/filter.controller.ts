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
import { buildFilterQuery, FilterParams } from 'src/helpers/filter.builder';
import {
  ComparatorKey,
  getComparatorSymbolByKey,
} from 'src/helpers/types.converter';

interface FilterResponse {
  uri: string;
  id: string;
  profile?: string;
}

@Controller('filter')
export class FilterController {
  constructor(private readonly fuseki: FusekiService) {}

  @Get()
  async filter(
    @Query('component') componentKey: string,
    @Query('propertyName') propertyName: string,
    @Query('op') op: ComparatorKey,
    @Query('propertyValue') propertyValue: number,
  ): Promise<FilterResponse[]> {
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

    console.log(params);

    const sparql = buildFilterQuery(params);

    console.log(sparql);

    try {
      const res = await this.fuseki.select(sparql);
      return res.results.bindings.map((b) => ({
        uri: b.item.value,
        id: b.id.value,
        profile: b.profile?.value,
      }));
    } catch {
      throw new HttpException(
        'Error executing SPARQL filter',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
