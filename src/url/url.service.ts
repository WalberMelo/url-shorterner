import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  generateUrl() {
    return { msg: 'Request short url received' };
  }

  retrieveUrl(): { url: string } {
    return { url: 'https://www.newurl.com' };
  }
}
