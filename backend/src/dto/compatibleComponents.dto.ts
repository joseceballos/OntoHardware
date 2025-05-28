import { IsDefined, IsString } from 'class-validator';

export class CompatibleComponentstDto {
  @IsDefined()
  @IsString()
  component1Id!: string;

  @IsDefined()
  @IsString()
  component2Id!: string;
}
