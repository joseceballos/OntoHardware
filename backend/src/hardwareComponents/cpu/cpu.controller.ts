import { Controller } from '@nestjs/common';
import { FusekiService } from '../../fuseki/fuseki.service';
import { BaseController } from '../base/BaseController';

@Controller('cpu')
export class CpuController extends BaseController {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'CPU');
  }
}
