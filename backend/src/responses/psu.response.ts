import { assertString, assertNumber } from 'src/helpers/types.converter';

export interface PSUResponse {
  id: string;
  productId: string;
  model: string;
  TDP: number;
  certification: string;
}

export function toPSUResponse(
  raw: Record<string, string | number>,
): PSUResponse {
  return {
    id: assertString(raw.id, 'id'),
    productId: assertString(raw.productId, 'productId'),
    model: assertString(raw.model, 'model'),
    TDP: assertNumber(raw.TDP, 'TDP'),
    certification: assertString(raw.certificationName, 'certification'),
  };
}
