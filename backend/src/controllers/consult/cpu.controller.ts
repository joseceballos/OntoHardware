import { Controller } from '@nestjs/common';
import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { CPUResponse } from 'src/responses/cpu.response';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';

@Controller('cpu')
export class CpuController extends BaseController<CPUResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'CPU', CPU_FIELD_MAPPINGS);
  }
}
