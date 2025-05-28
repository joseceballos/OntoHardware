import { FieldMappings } from 'src/mapping/field-mapping.config';
import { CPUResponse, toCPUResponse } from 'src/responses/cpu.response';
import { GPUResponse, toGPUResponse } from 'src/responses/gpu.response';
import { MBResponse, toMBResponse } from 'src/responses/mb.response';
import { RAMResponse, toRAMResponse } from 'src/responses/ram.response';
import { PSUResponse, toPSUResponse } from 'src/responses/psu.response';
import {
  StorageResponse,
  toStorageResponse,
} from 'src/responses/storage.response';
import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { GPU_FIELD_MAPPINGS } from 'src/mapping/gpu-mapping.config';
import { MB_FIELD_MAPPINGS } from 'src/mapping/mb-mapping.config';
import { RAM_FIELD_MAPPINGS } from 'src/mapping/ram-mapping.config';
import { PSU_FIELD_MAPPINGS } from 'src/mapping/psu-mapping.config';
import { STORAGE_FIELD_MAPPINGS } from 'src/mapping/storage-mapping.config';

export type ComponentKey = 'cpu' | 'mb' | 'gpu' | 'ram' | 'psu' | 'str';
export type ComponentType =
  | 'CPU'
  | 'Motherboard'
  | 'GPU'
  | 'RAM'
  | 'PSU'
  | 'Storage';

export type ComponentTypeResponse =
  | CPUResponse
  | GPUResponse
  | MBResponse
  | RAMResponse
  | PSUResponse
  | StorageResponse;

export type convertToResponse<T> = (
  rawComponent: Record<string, string | number>,
) => T;

export interface ComponentTypeConfig<T> {
  componentKey: ComponentKey;
  componentType: ComponentType;
  fieldMappings: FieldMappings;
  convertToResponse: convertToResponse<T>;
}

export interface ComponentTypesConfig {
  cpu: ComponentTypeConfig<CPUResponse>;
  gpu: ComponentTypeConfig<GPUResponse>;
  mb: ComponentTypeConfig<MBResponse>;
  ram: ComponentTypeConfig<RAMResponse>;
  psu: ComponentTypeConfig<PSUResponse>;
  str: ComponentTypeConfig<StorageResponse>;
}

export interface ComponentResponseMap {
  cpu: CPUResponse;
  gpu: GPUResponse;
  mb: MBResponse;
  ram: RAMResponse;
  psu: PSUResponse;
  str: StorageResponse;
}

export type ComponentTypesConfigType = {
  [K in ComponentKey]: ComponentTypeConfig<ComponentResponseMap[K]>;
};

export const COMPONENTS_TYPES_CONFIG: ComponentTypesConfigType = {
  cpu: {
    componentKey: 'cpu',
    componentType: 'CPU',
    fieldMappings: CPU_FIELD_MAPPINGS,
    convertToResponse: toCPUResponse,
  },
  gpu: {
    componentKey: 'gpu',
    componentType: 'GPU',
    fieldMappings: GPU_FIELD_MAPPINGS,
    convertToResponse: toGPUResponse,
  },
  mb: {
    componentKey: 'mb',
    componentType: 'Motherboard',
    fieldMappings: MB_FIELD_MAPPINGS,
    convertToResponse: toMBResponse,
  },
  ram: {
    componentKey: 'ram',
    componentType: 'RAM',
    fieldMappings: RAM_FIELD_MAPPINGS,
    convertToResponse: toRAMResponse,
  },
  psu: {
    componentKey: 'psu',
    componentType: 'PSU',
    fieldMappings: PSU_FIELD_MAPPINGS,
    convertToResponse: toPSUResponse,
  },
  str: {
    componentKey: 'str',
    componentType: 'Storage',
    fieldMappings: STORAGE_FIELD_MAPPINGS,
    convertToResponse: toStorageResponse,
  },
};
