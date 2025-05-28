import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { RAMResponse } from 'src/responses/ram.response';
import { COMPONENTS_TYPES_CONFIG } from 'src/data/componentType.config';

@Controller('ram')
export class RamController extends BaseController<RAMResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, COMPONENTS_TYPES_CONFIG.ram);
  }
}
