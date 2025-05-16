import { Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { PREFIXES } from 'src/helpers/sparql.prefixes';

export interface PropertyValue {
  property: string;
  pLabel?: string;
  value: string;
  vLabel: string;
}

export abstract class BaseController {
  constructor(
    protected readonly fuseki: FusekiService,
    private readonly typeName: string,
  ) {}

  @Get()
  async findAll(): Promise<Array<{ uri: string; label?: string }>> {
    const sparql = `
      ${PREFIXES}
      SELECT ?item ?label
      WHERE {
        ?item rdf:type onto:${this.typeName} .
        OPTIONAL { ?item rdfs:label ?label }
      }
      ORDER BY ?item`;

    try {
      const res = await this.fuseki.select(sparql);
      return res.results.bindings.map((b) => ({
        uri: b.item.value,
        label: b.label?.value,
      }));
    } catch {
      throw new HttpException('Error listing items', HttpStatus.BAD_GATEWAY);
    }
  }

  @Get(`:id`)
  async findOne(@Param('id') id: string): Promise<PropertyValue[]> {
    const sparql = `
      ${PREFIXES}
      SELECT ?prop ?plabel ?val ?vlabel
      WHERE {
        onto:${id} ?prop ?val
        OPTIONAL { ?prop rdfs:label ?plabel }
        OPTIONAL { ?val rdfs:label ?vlabel }
      }
      ORDER BY ?prop
    `;

    try {
      const res = await this.fuseki.select(sparql);
      return res.results.bindings.map((b) => ({
        property: b.prop.value,
        pLabel: b.plabel?.value,
        value: b.val.value,
        vLabel: b.vlabel?.value,
      }));
    } catch {
      throw new HttpException(
        `Error retrieving ${this.typeName} ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
