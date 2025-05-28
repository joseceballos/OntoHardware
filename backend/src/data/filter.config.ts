import { PropertyType } from 'src/builders/filter.builder';
import {
  COMPONENTS_TYPES_CONFIG,
  ComponentTypeConfig,
  ComponentTypeResponse,
} from './componentType.config';
import { ComponentBaseResponse } from 'src/responses/base.response';

export interface FilterConfig<T extends ComponentBaseResponse> {
  componentTypeConfig: ComponentTypeConfig<T>;
  propertyLabel: string;
  propertyName: string;
  propertyType: PropertyType;
  profile: string | null;
}

export const FILTER_CONFIG: Array<FilterConfig<ComponentTypeResponse>> = [
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.cpu,
    propertyLabel: 'cores',
    profile: 'CPUPerformanceProfile',
    propertyName: 'coreCount',
    propertyType: 'integer',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.cpu,
    propertyLabel: 'baseFrequency',
    profile: 'CPUPerformanceProfile',
    propertyName: 'baseFrequency',
    propertyType: 'decimal',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.cpu,
    propertyLabel: 'Socket',
    profile: 'CPUComponentFamily',
    propertyName: 'Socket',
    propertyType: 'objectId',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.gpu,
    propertyLabel: 'memoryCapacity',
    profile: 'GPUMemoryProfile',
    propertyName: 'memoryCapacity',
    propertyType: 'integer',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.gpu,
    propertyLabel: 'baseClock',
    profile: 'GPUPerformanceProfile',
    propertyName: 'baseClock',
    propertyType: 'decimal',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.gpu,
    propertyLabel: 'PCIPortType',
    profile: 'GPUComponentFamily',
    propertyName: 'PCIPortType',
    propertyType: 'objectId',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.ram,
    propertyLabel: 'speed',
    profile: 'RAMPerformanceProfile',
    propertyName: 'spdSpeed',
    propertyType: 'integer',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.ram,
    propertyLabel: 'moduleCapacity',
    profile: 'RAMMemoryModuleProfile',
    propertyName: 'moduleCapacity',
    propertyType: 'integer',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.ram,
    propertyLabel: 'MemoryType',
    profile: 'RAMComponentFamily',
    propertyName: 'MemoryType',
    propertyType: 'objectId',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.mb,
    propertyLabel: 'Chipset',
    profile: null,
    propertyName: 'Chipset',
    propertyType: 'objectId',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.mb,
    propertyLabel: 'CaseFormFactor',
    profile: null,
    propertyName: 'CaseFormFactor',
    propertyType: 'objectId',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.mb,
    propertyLabel: 'Socket',
    profile: 'MBComponentFamily',
    propertyName: 'Socket',
    propertyType: 'objectId',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.str,
    propertyLabel: 'diskCapacity',
    profile: 'StorageMemoryProfile',
    propertyName: 'diskCapacity',
    propertyType: 'integer',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.str,
    propertyLabel: 'DiskFormFactor',
    profile: 'StorageComponentFamily',
    propertyName: 'DiskFormFactor',
    propertyType: 'objectId',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.psu,
    propertyLabel: 'TDP',
    profile: null,
    propertyName: 'PowerTDP',
    propertyType: 'integer',
  },
  {
    componentTypeConfig: COMPONENTS_TYPES_CONFIG.psu,
    propertyLabel: 'powerPCIeConnectorCount',
    profile: 'PSUConnectivityProfile',
    propertyName: 'powerPCIeConnectorCount',
    propertyType: 'integer',
  },
];
