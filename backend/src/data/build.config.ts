import { IsDefined, IsString } from 'class-validator';
import { CompatibilityCheck } from './compatibility.config';
import { CPUResponse } from 'src/responses/cpu.response';
import { GPUResponse } from 'src/responses/gpu.response';
import { MBResponse } from 'src/responses/mb.response';
import { RAMResponse } from 'src/responses/ram.response';
import { PSUResponse } from 'src/responses/psu.response';
import { StorageResponse } from 'src/responses/storage.response';

export class CheckBuildDto {
  @IsDefined()
  @IsString()
  cpu!: string;

  @IsDefined()
  @IsString()
  mb!: string;

  @IsDefined()
  @IsString()
  gpu!: string;

  @IsDefined()
  @IsString()
  ram!: string;

  @IsDefined()
  @IsString()
  psu!: string;

  @IsDefined()
  @IsString()
  str!: string;
}

export interface ComponentsChecked {
  cpu: CPUResponse;
  gpu: GPUResponse;
  mb: MBResponse;
  ram: RAMResponse;
  psu: PSUResponse;
  str: StorageResponse;
}

export type IndividualCompatibilityResponse = CompatibilityCheck[];
