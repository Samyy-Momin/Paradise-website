import { Injectable } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { GetTestimonialsQueryDto } from './dto/get-testimonials-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  create(createTestimonialDto: CreateTestimonialDto) {
    return this.prisma.client.testimonial.create({
      data: {
        ...createTestimonialDto,
        approved: false,
      },
    });
  }

  findAll(query: GetTestimonialsQueryDto, isAdmin: boolean) {
    const { includeUnapproved } = query;
    return this.prisma.client.testimonial.findMany({
      where: includeUnapproved && isAdmin ? undefined : { approved: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string) {
    return this.prisma.client.testimonial.update({
      where: { id },
      data: { approved: true },
    });
  }

  async remove(id: string) {
    return this.prisma.client.testimonial.delete({
      where: { id },
    });
  }
}
