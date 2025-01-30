import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUrlDto, ShortUrlResponseDto, UrlHistoryDto } from './dto';
import { UrlsService } from './urls.service';

@Controller('url')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('create')
  create(@Body() createUrlDto: CreateUrlDto): Promise<ShortUrlResponseDto> {
    return this.urlsService.create(createUrlDto);
  }

  @Get('history')
  findAll(): Promise<UrlHistoryDto[]> {
    return this.urlsService.findAll();
  }

  @Get(':shortUrl')
  async redirectToOriginalUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    try {
      const shortCode = shortUrl.split('/').pop();

      if (!shortCode) {
        throw new NotFoundException('Invalid short URL');
      }

      const originalUrl = await this.urlsService.getOriginalUrl(shortCode);
      return res.redirect(301, originalUrl);
    } catch (error) {
      if (error instanceof Error) {
        throw new NotFoundException('Short URL not found');
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(+id);
  }
}
