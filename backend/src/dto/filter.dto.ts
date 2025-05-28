import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ComponentKey } from 'src/data/componentType.config';
import { ComparatorKey } from 'src/helpers/types.converter';

export class FilterDto {
  @IsDefined()
  @IsString()
  componentKey!: ComponentKey;

  @IsDefined()
  @IsString()
  propertyName!: string;

  @IsDefined()
  @IsString()
  propertyValue!: string;

  @IsOptional()
  @IsString()
  op!: ComparatorKey;
}
