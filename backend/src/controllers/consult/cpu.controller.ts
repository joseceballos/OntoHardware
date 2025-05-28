import { Controller } from '@nestjs/common';
import { CPUResponse } from 'src/responses/cpu.response';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { COMPONENTS_TYPES_CONFIG } from 'src/data/componentType.config';

@Controller('cpu')
export class CpuController extends BaseController<CPUResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, COMPONENTS_TYPES_CONFIG.cpu);
  }
}
