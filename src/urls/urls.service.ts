import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUrlDto, ShortUrlResponseDto, UrlHistoryDto } from './dto';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUrlDto: CreateUrlDto): Promise<ShortUrlResponseDto> {
    const randomSuffix = Math.random().toString(36).slice(2, 7);

    const fullShortUrl = `${process.env.CORS_ORIGIN}/${randomSuffix}`;

    try {
      const shortUrl = await this.prisma.url.create({
        data: {
          originalUrl: createUrlDto.originalUrl,
          description: createUrlDto.description,
          shortUrl: fullShortUrl,
        },
      });

      return shortUrl as ShortUrlResponseDto;
    } catch (error) {
      console.error('Error creating short URL:', error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Short url taken. Try again');
        }
        if (error.code === 'P2000') {
          throw new ForbiddenException('Url too long');
        }
        throw new Error('Unexpected error occurred while creating short URL');
      } else {
        throw new Error('Unexpected error occurred while creating short URL');
      }
    }
  }

  async getOriginalUrl(shortUrl: string): Promise<string> {
    const urlEntry = await this.prisma.url.findFirst({
      where: {
        shortUrl: {
          endsWith: `/${shortUrl}`,
        },
      },
    });

    if (!urlEntry) {
      throw new NotFoundException('Short URL not found');
    }

    return urlEntry.originalUrl;
  }

  async findAll(): Promise<UrlHistoryDto[]> {
    // 1) Fetch all the urls from the database
    const urls = await this.prisma.url.findMany();

    return urls as UrlHistoryDto[];
  }

  async remove(id: number) {
    const url = await this.prisma.url.findUnique({
      where: {
        id: id,
      },
    });

    if (!url) {
      throw new ForbiddenException('URL not found');
    }

    await this.prisma.url.delete({
      where: {
        id: id,
      },
    });

    return `This action removes a #${url.shortUrl} url`;
  }
}
