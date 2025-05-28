import { FieldMappings } from './field-mapping.config';

export const STORAGE_FIELD_MAPPINGS: FieldMappings = [
  { key: 'productId', uri: 'productId', type: 'string' },
  { key: 'model', uri: 'model', type: 'string' },
  {
    key: 'brand',
    uri: 'hasBrand',
    type: 'objectId',
    path: ['hasStorageComponentFamily'],
  },
  {
    key: 'capacity',
    uri: 'diskCapacity',
    type: 'integer',
    path: ['hasStorageMemoryProfile'],
  },
  {
    key: 'diskType',
    uri: 'hasDiskFormFactor',
    type: 'objectId',
    path: ['hasStorageComponentFamily'],
  },
];
