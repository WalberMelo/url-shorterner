export class ShortUrlResponseDto {
  id: number;
  shortUrl: string;
  originalUrl: string;
  description?: string | undefined | null;
  createdAt: Date;
}
