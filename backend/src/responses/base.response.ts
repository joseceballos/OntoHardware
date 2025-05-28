import { assertString } from 'src/helpers/types.converter';

export interface ComponentBaseResponse {
  id: string;
  productId: string;
  model: string;
}

export function toBaseResponse(
  rawComponent: Record<string, string | number>,
): ComponentBaseResponse {
  return {
    id: assertString(rawComponent.id, 'id'),
    productId: assertString(rawComponent.productId, 'productId'),
    model: assertString(rawComponent.model, 'model'),
  };
}
