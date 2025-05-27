import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { MB_FIELD_MAPPINGS } from 'src/mapping/mb-mapping.config';
import { MBResponse } from 'src/responses/mb.response';

@Controller('mb')
export class MbController extends BaseController<MBResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'Motherboard', MB_FIELD_MAPPINGS);
  }
}
