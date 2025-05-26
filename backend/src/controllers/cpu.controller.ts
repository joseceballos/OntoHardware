import { Controller } from '@nestjs/common';
import { FusekiService } from '../fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { CPUResponse } from 'src/responses/cpu.response';

@Controller('cpu')
export class CpuController extends BaseController<CPUResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'CPU', CPU_FIELD_MAPPINGS);
  }
}
