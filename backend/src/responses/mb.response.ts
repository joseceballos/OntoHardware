import { assertString } from 'src/helpers/types.converter';
import { ComponentBaseResponse, toBaseResponse } from './base.response';

export interface MBResponse extends ComponentBaseResponse {
  socket: string;
  memoryType: string;
  chipset: string;
  formFactor: string;
  PCIe: string;
}

export function toMBResponse(
  rawComponent: Record<string, string | number>,
): MBResponse {
  const componentBaseResponse = toBaseResponse(rawComponent);

  const mbResponse: MBResponse = {
    ...componentBaseResponse,
    socket: assertString(rawComponent.socketName, 'socket'),
    memoryType: assertString(rawComponent.memoryTypeName, 'memoryType'),
    chipset: assertString(rawComponent.chipsetName, 'chipset'),
    formFactor: assertString(rawComponent.formFactorName, 'formFactor'),
    PCIe: assertString(rawComponent.PCIeName, 'PCIe'),
  };

  return mbResponse;
}
