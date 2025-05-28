import { FieldMappings } from './field-mapping.config';

export const CPU_FIELD_MAPPINGS: FieldMappings = [
  { key: 'productId', uri: 'productId', type: 'string' },
  { key: 'model', uri: 'model', type: 'string' },
  {
    key: 'brand',
    uri: 'hasBrand',
    type: 'objectId',
    path: ['hasCPUComponentFamily'],
  },
  {
    key: 'socket',
    uri: 'hasSocket',
    type: 'objectId',
    path: ['hasCPUComponentFamily'],
  },
  {
    key: 'cores',
    uri: 'coreCount',
    type: 'integer',
    path: ['hasCPUPerformanceProfile'],
  },
  {
    key: 'baseFrequency',
    uri: 'baseFrequency',
    type: 'decimal',
    path: ['hasCPUPerformanceProfile'],
  },
  {
    key: 'TDP',
    uri: 'TDP',
    type: 'integer',
    path: ['hasCPUPerformanceProfile'],
  },
];
