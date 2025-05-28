import { assertNumber, assertString } from 'src/helpers/types.converter';
import { ComponentBaseResponse, toBaseResponse } from './base.response';

export interface GPUResponse extends ComponentBaseResponse {
  brand: string;
  memory: number;
  cpuBaseClock: number;
  PCIe: string;
  TDP: number;
}

export function toGPUResponse(
  rawComponent: Record<string, string | number>,
): GPUResponse {
  const componentBaseResponse = toBaseResponse(rawComponent);

  const gpuResponse: GPUResponse = {
    ...componentBaseResponse,
    brand: assertString(rawComponent.brandName, 'brand'),
    memory: assertNumber(rawComponent.memory, 'memory'),
    cpuBaseClock: assertNumber(rawComponent.cpuBaseClock, 'cpuBaseClock'),
    PCIe: assertString(rawComponent.PCIeName, 'PCIe'),
    TDP: assertNumber(rawComponent.TDP, 'TDP'),
  };

  return gpuResponse;
}
