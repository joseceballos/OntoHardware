export interface FilterConfig {
  componentKey: 'cpu' | 'gpu' | 'mb' | 'ram';
  propertyLabel: string;
  componentType: 'CPU' | 'GPU' | 'RAM' | 'Motherboard';
  profile: string | null;
  propertyName: string;
  isInteger: boolean;
}

export const FILTER_CONFIG: FilterConfig[] = [
  {
    componentKey: 'cpu',
    propertyLabel: 'cores',
    componentType: 'CPU',
    profile: 'CPUPerformanceProfile',
    propertyName: 'coreCount',
    isInteger: true,
  },
];
