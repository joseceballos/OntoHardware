import { assertString, assertNumber } from 'src/helpers/types.converter';

export interface StorageResponse {
  id: string;
  productId: string;
  model: string;
  brand: string;
  capacity: number;
  diskType: string;
}

export function toStorageResponse(
  raw: Record<string, string | number>,
): StorageResponse {
  return {
    id: assertString(raw.id, 'id'),
    productId: assertString(raw.productId, 'productId'),
    model: assertString(raw.model, 'model'),
    brand: assertString(raw.brandName, 'brand'),
    capacity: assertNumber(raw.capacity, 'capacity'),
    diskType: assertString(raw.diskTypeName, 'diskType'),
  };
}
