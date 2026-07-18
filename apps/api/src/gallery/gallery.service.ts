import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { GetGalleryQueryDto } from './dto/get-gallery-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  create(createGalleryDto: CreateGalleryDto) {
    return this.prisma.client.galleryItem.create({
      data: createGalleryDto,
    });
  }

  findAll(query: GetGalleryQueryDto) {
    const { categoryId, limit } = query;
    return this.prisma.client.galleryItem.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: limit ? parseInt(limit, 10) : undefined,
    });
  }

  async remove(id: string) {
    await this.prisma.client.galleryItem.delete({
      where: { id },
    });
  }
}
