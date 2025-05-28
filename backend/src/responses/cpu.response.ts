import { assertNumber, assertString } from 'src/helpers/types.converter';
import { ComponentBaseResponse, toBaseResponse } from './base.response';

export interface CPUResponse extends ComponentBaseResponse {
  brand: string;
  socket: string;
  cores?: number;
  baseFrequency?: number;
  TDP?: number;
}

export function toCPUResponse(
  rawComponent: Record<string, string | number>,
): CPUResponse {
  const componentBaseResponse = toBaseResponse(rawComponent);
  const cpuResponse: CPUResponse = {
    ...componentBaseResponse,
    brand: assertString(rawComponent.brandName, 'brand'),
    socket: assertString(rawComponent.socketName, 'socket'),
    cores: assertNumber(rawComponent.cores, 'cores'),
    baseFrequency: assertNumber(rawComponent.baseFrequency, 'baseFrequency'),
    TDP: assertNumber(rawComponent.TDP, 'baseFrequency'),
  };

  return cpuResponse;
}
