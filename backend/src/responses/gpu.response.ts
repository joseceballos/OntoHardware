import { assertString, assertNumber } from 'src/helpers/types.converter';

export interface GPUResponse {
  id: string;
  productId: string;
  model: string;
  brand: string;
  memory: number;
  cpuBaseClock: number;
  PCIe: string;
  TDP: number;
}

export function toGPUResponse(
  raw: Record<string, string | number>,
): GPUResponse {
  return {
    id: assertString(raw.id, 'id'),
    productId: assertString(raw.productId, 'productId'),
    model: assertString(raw.model, 'model'),
    brand: assertString(raw.brandName, 'brand'),
    memory: assertNumber(raw.memory, 'memory'),
    cpuBaseClock: assertNumber(raw.cpuBaseClock, 'cpuBaseClock'),
    PCIe: assertString(raw.PCIeName, 'PCIe'),
    TDP: assertNumber(raw.TDP, 'TDP'),
  };
}
