import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GalleryCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GalleryCategoryCreateInput) {
    try {
      return await this.prisma.client.galleryCategory.create({ data });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Category with this slug already exists');
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.client.galleryCategory.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.client.galleryCategory.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, data: Prisma.GalleryCategoryUpdateInput) {
    try {
      return await this.prisma.client.galleryCategory.update({
        where: { id },
        data,
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Category with this slug already exists');
      }
      throw new NotFoundException('Category not found');
    }
  }

  async remove(id: string) {
    // Check if category has items
    const count = await this.prisma.client.galleryItem.count({
      where: { categoryId: id },
    });
    if (count > 0) {
      throw new BadRequestException('Cannot delete category with associated images');
    }

    try {
      return await this.prisma.client.galleryCategory.delete({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException('Category not found');
    }
  }
}
