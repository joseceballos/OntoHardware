import { Controller } from '@nestjs/common';
import { FusekiService } from '../fuseki/fuseki.service';
import { BaseController } from './base/BaseController';

@Controller('ram')
export class RamController extends BaseController {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'RAM');
  }
}
