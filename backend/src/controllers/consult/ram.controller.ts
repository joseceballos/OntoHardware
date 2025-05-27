import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { RAM_FIELD_MAPPINGS } from 'src/mapping/ram-mapping.config';
import { RAMResponse } from 'src/responses/ram.response';

@Controller('ram')
export class RamController extends BaseController<RAMResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'RAM', RAM_FIELD_MAPPINGS);
  }
}
