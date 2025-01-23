import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUrlDto,
  ShortUrlResponseDto,
  UpdateUrlDto,
  UrlHistoryDto
} from './dto';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUrlDto: CreateUrlDto): Promise<ShortUrlResponseDto> {
    try {
      // 1) Create a short url using AI or some other logic.
      const newUrl = 'www.nsm.com';
      // 2) Save the short url in the database
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const shortUrl = await this.prisma.url.create({
        data: {
          originalUrl: createUrlDto.originalUrl,
          shortUrl: newUrl,
        },
      });

      return shortUrl as ShortUrlResponseDto;
    } catch (error) {
      console.error('Error creating short URL:', error);
      throw new Error('Could not create short URL');
    }
  }

  async findAll(): Promise<UrlHistoryDto[]> {
    // 1) Fetch all the urls from the database
    const urls = await this.prisma.url.findMany();

    return urls as UrlHistoryDto[];
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
