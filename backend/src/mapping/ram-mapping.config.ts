import { FieldMappings } from './field-mapping.config';

export const RAM_FIELD_MAPPINGS: FieldMappings = [
  { key: 'productId', uri: 'productId', type: 'string' },
  { key: 'model', uri: 'model', type: 'string' },
  {
    key: 'type',
    uri: 'hasMemoryType',
    type: 'objectId',
    path: ['hasRAMComponentFamily'],
  },
  {
    key: 'memorySpeed',
    uri: 'spdSpeed',
    type: 'integer',
    path: ['hasRAMPerformanceProfile'],
  },
  {
    key: 'capacityPerModule',
    uri: 'moduleCapacity',
    type: 'integer',
    path: ['hasRAMMemoryModuleProfile'],
  },
];
