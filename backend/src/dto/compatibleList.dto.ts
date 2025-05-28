import { IsDefined, IsString } from 'class-validator';
import { ComponentKey } from 'src/data/componentType.config';

export class CompatibleListDto {
  @IsDefined()
  @IsString()
  componentId!: string;

  @IsDefined()
  @IsString()
  componentKey!: ComponentKey;
}
