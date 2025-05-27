import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { GPU_FIELD_MAPPINGS } from 'src/mapping/gpu-mapping.config';
import { GPUResponse } from 'src/responses/gpu.response';

@Controller('gpu')
export class GpuController extends BaseController<GPUResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'GPU', GPU_FIELD_MAPPINGS);
  }
}
