import { getPropertyTypedFromRawValue } from 'src/helpers/types.converter';
import { FieldMappings } from './field-mapping.config';

export function applyMapping<T extends Record<string, any>>(
  id: string,
  binding: Record<string, { value: string }>,
  mappings: FieldMappings,
): T {
  const mappedObject: Record<string, any> = {
    uri: `onto:${id}`,
    id: id,
  };

  for (const m of mappings) {
    const valVar = `${m.key}Val`;
    const nameVar = `${m.key}Name`;

    if (binding[valVar]) {
      mappedObject[m.key] = getPropertyTypedFromRawValue(
        m,
        binding[valVar].value,
      );
    }

    if (m.type === 'objectId' && binding[nameVar]) {
      mappedObject[`${m.key}Name`] = binding[nameVar].value;
    }
  }

  return mappedObject as T;
}
