import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FusekiService } from './fuseki.service';

@Module({
  imports: [HttpModule],
  providers: [FusekiService],
  exports: [FusekiService],
})
export class FusekiModule {}
