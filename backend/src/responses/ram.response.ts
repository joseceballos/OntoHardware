import { assertString, assertNumber } from 'src/helpers/types.converter';

export interface RAMResponse {
  id: string;
  productId: string;
  model: string;
  type: string;
  memorySpeed: number;
  capacityPerModule: number;
}

export function toRAMResponse(
  raw: Record<string, string | number>,
): RAMResponse {
  return {
    id: assertString(raw.id, 'id'),
    productId: assertString(raw.productId, 'productId'),
    model: assertString(raw.model, 'model'),
    type: assertString(raw.typeName, 'type'),
    memorySpeed: assertNumber(raw.memorySpeed, 'memorySpeed'),
    capacityPerModule: assertNumber(raw.capacityPerModule, 'capacityPerModule'),
  };
}
