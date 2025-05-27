import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { FieldMapping } from 'src/mapping/mapper.utils';
import { GPU_FIELD_MAPPINGS } from 'src/mapping/gpu-mapping.config';
import { MB_FIELD_MAPPINGS } from 'src/mapping/mb-mapping.config';
import { RAM_FIELD_MAPPINGS } from 'src/mapping/ram-mapping.config';
import { PSU_FIELD_MAPPINGS } from 'src/mapping/psu-mapping.config';
import { STORAGE_FIELD_MAPPINGS } from 'src/mapping/storage-mapping.config';
import { CPUResponse } from 'src/responses/cpu.response';
import { GPUResponse } from 'src/responses/gpu.response';
import { MBResponse } from 'src/responses/mb.response';
import { RAMResponse } from 'src/responses/ram.response';
import { PSUResponse } from 'src/responses/psu.response';
import { StorageResponse } from 'src/responses/storage.response';
import { getComponentKeyByType } from 'src/helpers/types.converter';

export type ComponentKey = 'cpu' | 'mb' | 'gpu' | 'ram' | 'psu' | 'str';
export type ComponentType =
  | 'CPU'
  | 'Motherboard'
  | 'GPU'
  | 'RAM'
  | 'PSU'
  | 'Storage';
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

export const COMPATIBILITY_MAPPINGS: {
  [K in ComponentKey]: FieldMapping[];
} = {
  cpu: CPU_FIELD_MAPPINGS,
  gpu: GPU_FIELD_MAPPINGS,
  ram: RAM_FIELD_MAPPINGS,
  mb: MB_FIELD_MAPPINGS,
  psu: PSU_FIELD_MAPPINGS,
  str: STORAGE_FIELD_MAPPINGS,
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
