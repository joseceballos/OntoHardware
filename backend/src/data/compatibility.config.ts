import { CPUResponse } from 'src/responses/cpu.response';
import { GPUResponse } from 'src/responses/gpu.response';
import { MBResponse } from 'src/responses/mb.response';
import { RAMResponse } from 'src/responses/ram.response';
import { PSUResponse } from 'src/responses/psu.response';
import { StorageResponse } from 'src/responses/storage.response';
import { getComponentKeyByType } from 'src/helpers/types.converter';
import { ComponentKey, ComponentType } from './componentType.config';

export type FeatureType =
  | 'Socket'
  | 'MemoryType'
  | 'PCIPortType'
  | 'TDP'
  | 'DiskConnectionType';
export type CompatibilityRuleType = {
  components: [ComponentKey, ComponentKey];
  feature: FeatureType;
};

export type ComponentResponse =
  | CPUResponse
  | GPUResponse
  | MBResponse
  | RAMResponse
  | PSUResponse
  | StorageResponse;

export type CompatibilityCheck = {
  components: [ComponentResponse, ComponentResponse];
  feature: FeatureType;
  compatible: boolean;
};

export const COMPAT_CONFIG: CompatibilityRuleType[] = [
  {
    components: ['cpu', 'mb'],
    feature: 'Socket',
  },
  {
    components: ['ram', 'mb'],
    feature: 'MemoryType',
  },
  {
    components: ['gpu', 'mb'],
    feature: 'PCIPortType',
  },
  {
    components: ['str', 'mb'],
    feature: 'DiskConnectionType',
  },
];

export function getRulesByComponentKey(
  componentKey: ComponentKey,
): CompatibilityRuleType[] {
  return COMPAT_CONFIG.filter((rule) => rule.components.includes(componentKey));
}

export function getRulesByComponentType(
  componentType: ComponentType,
): CompatibilityRuleType[] {
  return COMPAT_CONFIG.filter((rule) =>
    rule.components.includes(getComponentKeyByType(componentType)!),
  );
}
