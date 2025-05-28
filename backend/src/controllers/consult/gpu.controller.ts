import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { GPUResponse } from 'src/responses/gpu.response';
import { COMPONENTS_TYPES_CONFIG } from 'src/data/componentType.config';

@Controller('gpu')
export class GpuController extends BaseController<GPUResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, COMPONENTS_TYPES_CONFIG.gpu);
  }
}
