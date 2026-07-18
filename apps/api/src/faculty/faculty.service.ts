import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacultyService {
  constructor(private prisma: PrismaService) {}

  create(createFacultyDto: CreateFacultyDto) {
    return this.prisma.client.facultyMember.create({
      data: createFacultyDto,
    });
  }

  findAll() {
    return this.prisma.client.facultyMember.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  async update(id: string, updateFacultyDto: CreateFacultyDto) {
    return this.prisma.client.facultyMember.update({
      where: { id },
      data: updateFacultyDto,
    });
  }

  async remove(id: string) {
    await this.prisma.client.facultyMember.delete({
      where: { id },
    });
  }
}
