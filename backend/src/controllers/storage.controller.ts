import { Controller } from '@nestjs/common';
import { FusekiService } from '../fuseki/fuseki.service';
import { BaseController } from './BaseController';
import { StorageResponse } from 'src/responses/storage.response';
import { STORAGE_FIELD_MAPPINGS } from 'src/mapping/storage-mapping.config';

@Controller('str')
export class StorageController extends BaseController<StorageResponse> {
  constructor(fuseki: FusekiService) {
    super(fuseki, 'Storage', STORAGE_FIELD_MAPPINGS);
  }
}
