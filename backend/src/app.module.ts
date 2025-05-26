import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { FusekiModule } from './fuseki/fuseki.module';
import { CpuController } from './controllers/cpu.controller';
import { MbController } from './controllers/mb.controller';
import { GpuController } from './controllers/gpu.controller';
import { RamController } from './controllers/ram.controller';
import { FilterController } from './controllers/filter.controller';
import { CompatibilityController } from './controllers/compatibility.controller';
import { PsuController } from './controllers/psu.controller';
import { StorageController } from './controllers/storage.controller';

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
  ],
  providers: [AppService],
})
export class AppModule {}
