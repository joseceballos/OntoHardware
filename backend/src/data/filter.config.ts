import { PropertyType } from 'src/helpers/sparql.builder';

export interface FilterConfig {
  componentKey: 'cpu' | 'gpu' | 'mb' | 'ram';
  propertyLabel: string;
  componentType: 'CPU' | 'GPU' | 'RAM' | 'Motherboard';
  profile: string | null;
  propertyName: string;
  propertyType: PropertyType;
}

export const FILTER_CONFIG: FilterConfig[] = [
  {
    componentKey: 'cpu',
    propertyLabel: 'cores',
    componentType: 'CPU',
    profile: 'CPUPerformanceProfile',
    propertyName: 'coreCount',
    propertyType: 'integer',
  },
  {
    componentKey: 'cpu',
    propertyLabel: 'baseFrequency',
    componentType: 'CPU',
    profile: 'CPUPerformanceProfile',
    propertyName: 'baseFrequency',
    propertyType: 'decimal',
  },
  {
    componentKey: 'gpu',
    propertyLabel: 'memory',
    componentType: 'GPU',
    profile: 'GPUMemoryProfile',
    propertyName: 'memoryCapacity',
    propertyType: 'integer',
  },
  {
    componentKey: 'gpu',
    propertyLabel: 'baseClock',
    componentType: 'GPU',
    profile: 'GPUPerformanceProfile',
    propertyName: 'baseClock',
    propertyType: 'decimal',
  },
  {
    componentKey: 'ram',
    propertyLabel: 'speed',
    componentType: 'RAM',
    profile: 'RAMPerformanceProfile',
    propertyName: 'spdSpeed',
    propertyType: 'integer',
  },
  {
    componentKey: 'ram',
    propertyLabel: 'moduleCapacity',
    componentType: 'RAM',
    profile: 'RAMMemoryModuleProfile',
    propertyName: 'moduleCapacity',
    propertyType: 'integer',
  },
  {
    componentKey: 'mb',
    propertyLabel: 'Chipset',
    componentType: 'Motherboard',
    profile: null,
    propertyName: 'Chipset',
    propertyType: 'objectId',
  },
  {
    componentKey: 'mb',
    propertyLabel: 'CaseFormFactor',
    componentType: 'Motherboard',
    profile: null,
    propertyName: 'CaseFormFactor',
    propertyType: 'objectId',
  },
];
