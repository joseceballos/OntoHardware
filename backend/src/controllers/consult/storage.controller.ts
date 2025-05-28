import { Controller } from '@nestjs/common';
import { FusekiService } from 'src/fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { StorageResponse } from 'src/responses/storage.response';
import { COMPONENTS_TYPES_CONFIG } from 'src/data/componentType.config';

@Controller('str')
export class StorageController extends BaseController<StorageResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, COMPONENTS_TYPES_CONFIG.str);
  }
}
