import { PropertyType } from 'src/builders/filter.builder';
import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { FieldMapping } from 'src/mapping/mapper.utils';
import { GPU_FIELD_MAPPINGS } from 'src/mapping/gpu-mapping.config';
import { MB_FIELD_MAPPINGS } from 'src/mapping/mb-mapping.config';
import { RAM_FIELD_MAPPINGS } from 'src/mapping/ram-mapping.config';

export interface FilterConfig {
  componentKey: 'cpu' | 'gpu' | 'mb' | 'ram';
  propertyLabel: string;
  componentType: 'CPU' | 'GPU' | 'RAM' | 'Motherboard';
  profile: string | null;
  propertyName: string;
  propertyType: PropertyType;
  fieldMappings: FieldMapping[];
}

export const FILTER_CONFIG: FilterConfig[] = [
  {
    componentKey: 'cpu',
    propertyLabel: 'cores',
    componentType: 'CPU',
    profile: 'CPUPerformanceProfile',
    propertyName: 'coreCount',
    propertyType: 'integer',
    fieldMappings: CPU_FIELD_MAPPINGS,
  },
  {
    componentKey: 'cpu',
    propertyLabel: 'baseFrequency',
    componentType: 'CPU',
    profile: 'CPUPerformanceProfile',
    propertyName: 'baseFrequency',
    propertyType: 'decimal',
    fieldMappings: CPU_FIELD_MAPPINGS,
  },
  {
    componentKey: 'gpu',
    propertyLabel: 'memory',
    componentType: 'GPU',
    profile: 'GPUMemoryProfile',
    propertyName: 'memoryCapacity',
    propertyType: 'integer',
    fieldMappings: GPU_FIELD_MAPPINGS,
  },
  {
    componentKey: 'gpu',
    propertyLabel: 'baseClock',
    componentType: 'GPU',
    profile: 'GPUPerformanceProfile',
    propertyName: 'baseClock',
    propertyType: 'decimal',
    fieldMappings: GPU_FIELD_MAPPINGS,
  },
  {
    componentKey: 'ram',
    propertyLabel: 'speed',
    componentType: 'RAM',
    profile: 'RAMPerformanceProfile',
    propertyName: 'spdSpeed',
    propertyType: 'integer',
    fieldMappings: RAM_FIELD_MAPPINGS,
  },
  {
    componentKey: 'ram',
    propertyLabel: 'moduleCapacity',
    componentType: 'RAM',
    profile: 'RAMMemoryModuleProfile',
    propertyName: 'moduleCapacity',
    propertyType: 'integer',
    fieldMappings: RAM_FIELD_MAPPINGS,
  },
  {
    componentKey: 'mb',
    propertyLabel: 'Chipset',
    componentType: 'Motherboard',
    profile: null,
    propertyName: 'Chipset',
    propertyType: 'objectId',
    fieldMappings: MB_FIELD_MAPPINGS,
  },
  {
    componentKey: 'mb',
    propertyLabel: 'CaseFormFactor',
    componentType: 'Motherboard',
    profile: null,
    propertyName: 'CaseFormFactor',
    propertyType: 'objectId',
    fieldMappings: MB_FIELD_MAPPINGS,
  },
];
