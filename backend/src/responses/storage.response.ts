import { assertNumber, assertString } from 'src/helpers/types.converter';
import { ComponentBaseResponse, toBaseResponse } from './base.response';

export interface StorageResponse extends ComponentBaseResponse {
  brand: string;
  capacity: number;
  diskType: string;
}

export function toStorageResponse(
  rawComponent: Record<string, string | number>,
): StorageResponse {
  const componentBaseResponse = toBaseResponse(rawComponent);

  const storageResponse: StorageResponse = {
    ...componentBaseResponse,
    brand: assertString(rawComponent.brandName, 'brand'),
    capacity: assertNumber(rawComponent.capacity, 'capacity'),
    diskType: assertString(rawComponent.diskTypeName, 'diskType'),
  };

  return storageResponse;
}
