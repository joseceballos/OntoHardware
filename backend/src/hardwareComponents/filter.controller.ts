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
import { buildNumericFilterQuery } from 'src/helpers/sparql.builder';

type ComparatorKey = 'gt' | 'lt' | 'ge' | 'le' | 'eq';
type ComparisonSymbol = '>' | '<' | '>=' | '<=' | '=';

const COMPARATOR_MAP: Record<ComparatorKey, ComparisonSymbol> = {
  gt: '>',
  lt: '<',
  ge: '>=',
  le: '<=',
  eq: '=',
};

interface FilterResponse {
  uri: string;
  id: string;
  value: number;
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

    const comparatorSymbol = COMPARATOR_MAP[op];

    const sparql = buildNumericFilterQuery(
      filterData.componentType,
      filterData.profile,
      filterData.propertyName,
      propertyValue,
      comparatorSymbol,
      {
        valueVar: `${filterData.propertyLabel}Raw`,
        isInteger: filterData.isInteger,
      },
    );

    try {
      const res = await this.fuseki.select(sparql);
      return res.results.bindings.map((b) => ({
        uri: b.item.value,
        id: b.id.value,
        value: parseInt(b.value.value, 10),
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
