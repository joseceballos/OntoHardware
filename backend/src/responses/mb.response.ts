import { assertString } from 'src/helpers/types.converter';

export interface MBResponse {
  id: string;
  productId: string;
  model: string;
  socket: string;
  memoryType: string;
  chipset: string;
  formFactor: string;
  PCIe: string;
}

export function toMBResponse(raw: Record<string, string | number>): MBResponse {
  return {
    id: assertString(raw.id, 'id'),
    productId: assertString(raw.productId, 'productId'),
    model: assertString(raw.model, 'model'),
    socket: assertString(raw.socketName, 'socket'),
    memoryType: assertString(raw.memoryTypeName, 'memoryType'),
    chipset: assertString(raw.chipsetName, 'chipset'),
    formFactor: assertString(raw.formFactorName, 'formFactor'),
    PCIe: assertString(raw.PCIeName, 'PCIe'),
  };
}
