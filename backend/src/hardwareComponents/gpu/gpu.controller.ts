import { Controller } from '@nestjs/common';
import { FusekiService } from '../../fuseki/fuseki.service';
import { BaseController } from '../base/BaseController';

@Controller('gpu')
export class GpuController extends BaseController {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'GPU');
  }
}
