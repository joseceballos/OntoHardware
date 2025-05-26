import { FieldMapping } from './mapper.utils';

export const GPU_FIELD_MAPPINGS: FieldMapping[] = [
  { key: 'productId', uri: 'productId', type: 'string' },
  { key: 'model', uri: 'model', type: 'string' },
  {
    key: 'brand',
    uri: 'hasBrand',
    type: 'objectId',
    path: ['hasGPUComponentFamily'],
  },
  {
    key: 'memory',
    uri: 'memoryCapacity',
    type: 'integer',
    path: ['hasGPUMemoryProfile'],
  },
  {
    key: 'cpuBaseClock',
    uri: 'baseClock',
    type: 'integer',
    path: ['hasGPUPerformanceProfile'],
  },
  {
    key: 'PCIe',
    uri: 'hasPCIPortType',
    type: 'objectId',
    path: ['hasGPUComponentFamily'],
  },
  {
    key: 'TDP',
    uri: 'TDP',
    type: 'integer',
    path: ['hasGPUPerformanceProfile'],
  },
];
