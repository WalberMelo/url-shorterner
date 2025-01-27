import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import {
  CreateUrlDto,
  ShortUrlResponseDto,
  UpdateUrlDto,
  UrlHistoryDto
} from './dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(+id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(+id);
  }
}
