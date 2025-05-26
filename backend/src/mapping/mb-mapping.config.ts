import { FieldMapping } from './mapper.utils';

export const MB_FIELD_MAPPINGS: FieldMapping[] = [
  { key: 'productId', uri: 'productId', type: 'string' },
  { key: 'model', uri: 'model', type: 'string' },
  {
    key: 'socket',
    uri: 'hasSocket',
    type: 'objectId',
    path: ['hasMBComponentFamily'],
  },
  {
    key: 'memoryType',
    uri: 'hasMemoryType',
    type: 'objectId',
    path: ['hasMBComponentFamily'],
  },
  {
    key: 'chipset',
    uri: 'hasChipset',
    type: 'objectId',
    path: [],
  },
  {
    key: 'formFactor',
    uri: 'hasCaseFormFactor',
    type: 'objectId',
    path: [],
  },
  {
    key: 'PCIe',
    uri: 'hasPCIPortType',
    type: 'objectId',
    path: ['hasMBConnectivityProfile'],
  },
];
