import { FieldMapping } from 'src/mapping/mapper.utils';
import { applyMapping } from 'src/mapping/mapper.utils';

export function mapBindingsToComponents<T extends Record<string, any>>(
  rawComponents: Array<{
    id: string;
    binding: Record<string, { value: string }>;
  }>,
  mappings: FieldMapping[],
): T[] {
  return rawComponents.map(({ id, binding }) =>
    applyMapping<T>(id, binding, mappings),
  );
}
