import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import slugify from 'slugify';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUrlDto, ShortUrlResponseDto, UrlHistoryDto } from './dto';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUrlDto: CreateUrlDto): Promise<ShortUrlResponseDto> {
    try {
      const urlObject = new URL(createUrlDto.originalUrl);

      const path = urlObject.pathname.replace(/\d+/g, ''); // Remove numbers from the path

      const baseSlug = slugify(path, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@\d]/g,
      });

      // Add randomization to ensure uniqueness
      const randomSuffix = Math.random().toString(36).slice(2, 7);
      const newShortUrl = `${baseSlug}-${randomSuffix}`;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const shortUrl = await this.prisma.url.create({
        data: {
          originalUrl: createUrlDto.originalUrl,
          description: createUrlDto.description,
          shortUrl: newShortUrl,
        },
      });

      return shortUrl as ShortUrlResponseDto;
    } catch (error) {
      console.error('Error creating short URL:', error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Short url taken. Try again');
        }
      }
      throw error;
    }
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
