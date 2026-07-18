import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/create-notice.dto';
import { GetNoticesQueryDto } from './dto/get-notices-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoticesService {
  constructor(private prisma: PrismaService) {}

  async create(createNoticeDto: CreateNoticeDto) {
    const slug = createNoticeDto.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    return this.prisma.client.notice.create({
      data: {
        ...createNoticeDto,
        slug,
        publishAt: new Date(createNoticeDto.publishAt),
      },
    });
  }

  async findAll(query: GetNoticesQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.client.notice.findMany({
        skip,
        take: limit,
        orderBy: { publishAt: 'desc' },
      }),
      this.prisma.client.notice.count(),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneBySlug(slug: string) {
    const notice = await this.prisma.client.notice.findFirst({
      where: { slug },
    });
    if (!notice) {
      throw new NotFoundException(`Notice with slug ${slug} not found`);
    }
    return notice;
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    let slug;
    if (updateNoticeDto.title) {
      slug = updateNoticeDto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    return this.prisma.client.notice.update({
      where: { id },
      data: {
        ...updateNoticeDto,
        ...(slug && { slug }),
        ...(updateNoticeDto.publishAt && {
          publishAt: new Date(updateNoticeDto.publishAt),
        }),
      },
    });
  }

  async remove(id: string) {
    await this.prisma.client.notice.delete({
      where: { id },
    });
  }
}
