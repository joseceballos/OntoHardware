import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { FusekiModule } from './fuseki/fuseki.module';
import { CpuController } from './controllers/consult/cpu.controller';
import { MbController } from './controllers/consult/mb.controller';
import { GpuController } from './controllers/consult/gpu.controller';
import { RamController } from './controllers/consult/ram.controller';
import { FilterController } from './controllers/filter/filter.controller';
import { CompatibilityController } from './controllers/compatibility/compatibility.controller';
import { PsuController } from './controllers/consult/psu.controller';
import { StorageController } from './controllers/consult/storage.controller';
import { BuildController } from './controllers/compatibility/build.controller';
import { CompatibilityService } from './services/compatibility.service';

@Module({
  imports: [HttpModule, FusekiModule],
  controllers: [
    AppController,
    CpuController,
    MbController,
    GpuController,
    RamController,
    PsuController,
    StorageController,
    FilterController,
    CompatibilityController,
    BuildController,
  ],
  providers: [AppService, CompatibilityService],
})
export class AppModule {}
