import { IsDefined, IsString } from 'class-validator';

export class CheckBuildDto {
  @IsDefined()
  @IsString()
  cpu!: string;

  @IsDefined()
  @IsString()
  mb!: string;

  @IsDefined()
  @IsString()
  gpu!: string;

  @IsDefined()
  @IsString()
  ram!: string;

  @IsDefined()
  @IsString()
  psu!: string;

  @IsDefined()
  @IsString()
  str!: string;
}
