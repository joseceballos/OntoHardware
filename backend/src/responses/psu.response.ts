import { assertNumber, assertString } from 'src/helpers/types.converter';
import { ComponentBaseResponse, toBaseResponse } from './base.response';

export interface PSUResponse extends ComponentBaseResponse {
  certification: string;
  TDP: number;
}

export function toPSUResponse(
  rawComponent: Record<string, string | number>,
): PSUResponse {
  const componentBaseResponse = toBaseResponse(rawComponent);

  const psuResponse: PSUResponse = {
    ...componentBaseResponse,
    certification: assertString(
      rawComponent.certificationName,
      'certification',
    ),
    TDP: assertNumber(rawComponent.TDP, 'TDP'),
  };

  return psuResponse;
}
