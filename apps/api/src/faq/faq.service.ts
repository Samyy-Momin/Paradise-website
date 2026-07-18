import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.FAQItemCreateInput) {
    return this.prisma.client.fAQItem.create({ data });
  }

  findAll() {
    return this.prisma.client.fAQItem.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.client.fAQItem.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('FAQ item not found');
    return item;
  }

  async update(id: string, data: Prisma.FAQItemUpdateInput) {
    try {
      return await this.prisma.client.fAQItem.update({
        where: { id },
        data,
      });
    } catch (e) {
      throw new NotFoundException('FAQ item not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.client.fAQItem.delete({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException('FAQ item not found');
    }
  }
}
