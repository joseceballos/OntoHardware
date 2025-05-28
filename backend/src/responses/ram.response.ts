import { assertNumber, assertString } from 'src/helpers/types.converter';
import { ComponentBaseResponse, toBaseResponse } from './base.response';

export interface RAMResponse extends ComponentBaseResponse {
  type: string;
  memorySpeed: number;
  capacityPerModule: number;
}

export function toRAMResponse(
  rawComponent: Record<string, string | number>,
): RAMResponse {
  const componentBaseResponse = toBaseResponse(rawComponent);

  const ramResponse: RAMResponse = {
    ...componentBaseResponse,
    type: assertString(rawComponent.typeName, 'type'),
    memorySpeed: assertNumber(rawComponent.memorySpeed, 'memorySpeed'),
    capacityPerModule: assertNumber(
      rawComponent.capacityPerModule,
      'capacityPerModule',
    ),
  };

  return ramResponse;
}
