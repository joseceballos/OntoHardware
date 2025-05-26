import { PropertyType } from 'src/builders/filter.builder';
import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { FieldMapping } from 'src/mapping/mapper.utils';
import { GPU_FIELD_MAPPINGS } from 'src/mapping/gpu-mapping.config';
import { MB_FIELD_MAPPINGS } from 'src/mapping/mb-mapping.config';
import { RAM_FIELD_MAPPINGS } from 'src/mapping/ram-mapping.config';
import { STORAGE_FIELD_MAPPINGS } from 'src/mapping/storage-mapping.config';
import { PSU_FIELD_MAPPINGS } from 'src/mapping/psu-mapping.config';

export interface FilterConfig {
  componentKey: 'cpu' | 'gpu' | 'mb' | 'ram' | 'psu' | 'str';
  propertyLabel: string;
  componentType: 'CPU' | 'GPU' | 'RAM' | 'Motherboard' | 'PSU' | 'Storage';
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
    componentKey: 'cpu',
    propertyLabel: 'Socket',
    componentType: 'CPU',
    profile: 'CPUComponentFamily',
    propertyName: 'Socket',
    propertyType: 'objectId',
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
    componentKey: 'gpu',
    propertyLabel: 'PCIPortType',
    componentType: 'GPU',
    profile: 'GPUComponentFamily',
    propertyName: 'PCIPortType',
    propertyType: 'objectId',
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
    componentKey: 'ram',
    propertyLabel: 'MemoryType',
    componentType: 'RAM',
    profile: 'RAMComponentFamily',
    propertyName: 'MemoryType',
    propertyType: 'objectId',
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
  {
    componentKey: 'mb',
    propertyLabel: 'Socket',
    componentType: 'Motherboard',
    profile: 'MBComponentFamily',
    propertyName: 'Socket',
    propertyType: 'objectId',
    fieldMappings: MB_FIELD_MAPPINGS,
  },
  {
    componentKey: 'str',
    propertyLabel: 'diskCapacity',
    componentType: 'Storage',
    profile: 'StorageMemoryProfile',
    propertyName: 'diskCapacity',
    propertyType: 'integer',
    fieldMappings: STORAGE_FIELD_MAPPINGS,
  },
  {
    componentKey: 'str',
    propertyLabel: 'DiskFormFactor',
    componentType: 'Storage',
    profile: 'StorageComponentFamily',
    propertyName: 'DiskFormFactor',
    propertyType: 'objectId',
    fieldMappings: STORAGE_FIELD_MAPPINGS,
  },
  {
    componentKey: 'psu',
    propertyLabel: 'PowerTDP',
    componentType: 'PSU',
    profile: null,
    propertyName: 'PowerTDP',
    propertyType: 'integer',
    fieldMappings: PSU_FIELD_MAPPINGS,
  },
  {
    componentKey: 'psu',
    propertyLabel: 'powerPCIeConnectorCount',
    componentType: 'PSU',
    profile: 'PSUConnectivityProfile',
    propertyName: 'powerPCIeConnectorCount',
    propertyType: 'integer',
    fieldMappings: PSU_FIELD_MAPPINGS,
  },
];
