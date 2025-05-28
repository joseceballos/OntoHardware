export type FieldType = 'string' | 'integer' | 'decimal' | 'objectId';

export interface FieldMapping {
  key: string;
  uri: string;
  type: FieldType;
  path?: string[];
}

export type FieldMappings = Array<FieldMapping>;
