import { Controller } from '@nestjs/common';
import { FusekiService } from '../../fuseki/fuseki.service';
import { BaseController } from '../base/BaseController';

@Controller('mb')
export class MbController extends BaseController {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'Motherboard');
  }
}
