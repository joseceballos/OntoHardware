import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { FusekiModule } from './fuseki/fuseki.module';
import { CpuController } from './hardwareComponents/cpu/cpu.controller';
import { MbController } from './hardwareComponents/mb/mb.controller';
import { GpuController } from './hardwareComponents/gpu/gpu.controller';
import { RamController } from './hardwareComponents/ram/ram.controller';

@Module({
  imports: [HttpModule, FusekiModule],
  controllers: [
    AppController,
    CpuController,
    MbController,
    GpuController,
    RamController,
  ],
  providers: [AppService],
})
export class AppModule {}
