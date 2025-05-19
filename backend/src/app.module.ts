import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { FusekiModule } from './fuseki/fuseki.module';
import { CpuController } from './hardwareComponents/cpu.controller';
import { MbController } from './hardwareComponents/mb.controller';
import { GpuController } from './hardwareComponents/gpu.controller';
import { RamController } from './hardwareComponents/ram.controller';
import { FilterController } from './hardwareComponents/filter.controller';
import { CompatibilityController } from './hardwareComponents/compatibility.controller';

@Module({
  imports: [HttpModule, FusekiModule],
  controllers: [
    AppController,
    CpuController,
    MbController,
    GpuController,
    RamController,
    FilterController,
    CompatibilityController,
  ],
  providers: [AppService],
})
export class AppModule {}
