import { assertNumber, assertString } from 'src/helpers/types.converter';

export interface CPUResponse {
  id: string;
  productId: string;
  model: string;
  brand: string;
  socket: string;
  cores?: number;
  threads?: number;
  baseFrequency?: number;
  boostFrequency?: number;
  TDP?: number;
}

export function toCPUResponse(
  raw: Record<string, string | number>,
): CPUResponse {
  const cpuResponse: CPUResponse = {
    id: assertString(raw.id, 'id'),
    productId: assertString(raw.productId, 'productId'),
    model: assertString(raw.model, 'model'),
    brand: assertString(raw.brandName, 'brand'),
    socket: assertString(raw.socketName, 'socket'),
    cores: assertNumber(raw.cores, 'cores'),
    baseFrequency: assertNumber(raw.baseFrequency, 'baseFrequency'),
    TDP: assertNumber(raw.TDP, 'baseFrequency'),
  };

  return cpuResponse;
}
