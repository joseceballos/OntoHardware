import { Controller, Get, Param } from '@nestjs/common';
import { FusekiService } from '../../fuseki/fuseki.service';

interface PropertyValue {
  property: string;
  pLabel?: string;
  value: string;
  vLabel?: string;
}

@Controller('cpu')
export class CpuController {
  constructor(private readonly fuseki: FusekiService) {}

  @Get()
  async findAll(): Promise<Array<{ cpu: string; label?: string }>> {
    const sparql = `
      PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX onto: <http://www.semanticweb.org/josec/ontologies/2025/3/ontohardware#>

      SELECT ?cpu ?label
      WHERE {
        ?cpu rdf:type onto:CPU .
        OPTIONAL { ?cpu rdfs:label ?label }
      }
      ORDER BY ?cpu
    `;
    const res = await this.fuseki.select(sparql);
    return res.results.bindings.map((b) => ({
      cpu: b.cpu.value,
      label: b.label?.value,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PropertyValue[]> {
    const sparql = `
      PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX onto:  <http://www.semanticweb.org/josec/ontologies/2025/3/ontohardware#>

      SELECT ?prop ?plabel ?val ?vlabel
      WHERE {
        onto:${id} ?prop ?val .
        OPTIONAL { ?prop rdfs:label ?plabel }
        OPTIONAL { ?val  rdfs:label ?vlabel }
      }
      ORDER BY ?prop
    `;

    const res = await this.fuseki.select(sparql);

    return res.results.bindings.map((b) => ({
      property: b.prop.value,
      pLabel: b.plabel?.value,
      value: b.val.value,
      vLabel: b.vlabel?.value,
    }));
  }
}
