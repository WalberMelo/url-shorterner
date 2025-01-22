import { Controller, Get, Post } from '@nestjs/common';

import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('generate')
  generateUrl(): { msg: string } {
    return this.urlService.generateUrl();
  }

  @Get('retrieve')
  getUrl(): { url: string } {
    return this.urlService.retrieveUrl();
  }
}
