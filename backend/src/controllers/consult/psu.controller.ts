import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { PSUResponse } from 'src/responses/psu.response';
import { COMPONENTS_TYPES_CONFIG } from 'src/data/componentType.config';

@Controller('psu')
export class PsuController extends BaseController<PSUResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, COMPONENTS_TYPES_CONFIG.psu);
  }
}
