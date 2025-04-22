import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { FusekiModule } from './fuseki/fuseki.module';
import { CpuController } from './components/cpu/cpu.controller';

@Module({
  imports: [HttpModule, FusekiModule],
  controllers: [AppController, CpuController],
  providers: [AppService],
})
export class AppModule {}
