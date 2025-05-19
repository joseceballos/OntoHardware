export type ComponentKey = 'cpu' | 'mb' | 'gpu' | 'ram';
export type ComponentType = 'CPU' | 'Motherboard' | 'GPU' | 'RAM';
export type FeatureType = 'Socket' | 'MemoryType' | 'PCIPortType';
export type CompatibilityRuleType = {
  components: [ComponentType, ComponentType];
  feature: FeatureType;
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
];

export function getRulesByComponentType(
  componentType: ComponentType,
): CompatibilityRuleType[] {
  return COMPAT_CONFIG.filter((rule) =>
    rule.components.includes(componentType),
  );
}
