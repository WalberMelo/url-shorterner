import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('create')
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

  @Get()
  findAll() {
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
