import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectUrlDto {
  @IsString()
  @IsNotEmpty()
  shortUrl: string;
}
