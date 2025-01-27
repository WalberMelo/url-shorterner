import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @IsOptional()
  @IsString()
  description: string;
}
