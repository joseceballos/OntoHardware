import { CPU_FIELD_MAPPINGS } from 'src/mapping/cpu-mapping.config';
import { FieldMapping } from 'src/mapping/mapper.utils';
import { GPU_FIELD_MAPPINGS } from 'src/mapping/gpu-mapping.config';
import { MB_FIELD_MAPPINGS } from 'src/mapping/mb-mapping.config';
import { RAM_FIELD_MAPPINGS } from 'src/mapping/ram-mapping.config';
import { PSU_FIELD_MAPPINGS } from 'src/mapping/psu-mapping.config';
import { STORAGE_FIELD_MAPPINGS } from 'src/mapping/storage-mapping.config';

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
  | 'M2PortType';
export type CompatibilityRuleType = {
  components: [ComponentType, ComponentType];
  feature: FeatureType;
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
    components: ['CPU', 'Motherboard'],
    feature: 'Socket',
  },
  {
    components: ['RAM', 'Motherboard'],
    feature: 'MemoryType',
  },
  {
    components: ['GPU', 'Motherboard'],
    feature: 'PCIPortType',
  },
  {
    components: ['Storage', 'Motherboard'],
    feature: 'PCIPortType',
  },
  {
    components: ['Storage', 'Motherboard'],
    feature: 'M2PortType',
  },
];

export function getRulesByComponentType(
  componentType: ComponentType,
): CompatibilityRuleType[] {
  return COMPAT_CONFIG.filter((rule) =>
    rule.components.includes(componentType),
  );
}
