import { FieldMapping } from './mapper.utils';

export const PSU_FIELD_MAPPINGS: FieldMapping[] = [
  { key: 'productId', uri: 'productId', type: 'string' },
  { key: 'model', uri: 'model', type: 'string' },
  { key: 'TDP', uri: 'PowerTDP', type: 'integer' },
  {
    key: 'brand',
    uri: 'hasBrand',
    type: 'objectId',
    path: ['hasPSUComponentFamily'],
  },
  {
    key: 'certification',
    uri: 'hasEfficiencyCertification',
    type: 'objectId',
    path: ['hasPSUComponentFamily'],
  },
];
