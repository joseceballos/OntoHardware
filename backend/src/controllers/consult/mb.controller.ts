import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { MBResponse } from 'src/responses/mb.response';
import { COMPONENTS_TYPES_CONFIG } from 'src/data/componentType.config';

@Controller('mb')
export class MbController extends BaseController<MBResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, COMPONENTS_TYPES_CONFIG.mb);
  }
}
