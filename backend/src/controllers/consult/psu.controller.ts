import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { PSUResponse } from 'src/responses/psu.response';
import { PSU_FIELD_MAPPINGS } from 'src/mapping/psu-mapping.config';

@Controller('psu')
export class PsuController extends BaseController<PSUResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'PSU', PSU_FIELD_MAPPINGS);
  }
}
