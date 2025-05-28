import { FieldMappings } from 'src/mapping/field-mapping.config';
import { applyMapping } from 'src/mapping/mapper.utils';

export function mapBindingsToComponents<T extends Record<string, any>>(
  rawComponents: Array<{
    id: string;
    binding: Record<string, { value: string }>;
  }>,
  mappings: FieldMappings,
): T[] {
  return rawComponents.map(({ id, binding }) =>
    applyMapping<T>(id, binding, mappings),
  );
}
