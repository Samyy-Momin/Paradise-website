import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateEnquiryDto,
  UpdateEnquiryStatusDto,
  CreateEnquiryNoteDto,
} from './dto/create-enquiry.dto';
import { GetEnquiriesQueryDto } from './dto/get-enquiries-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(createEnquiryDto: CreateEnquiryDto) {
    // Note: openapi says string, but prisma might want string for childAge as per our schema (wait, openapi says integer for childAge but schema says String?)
    // In schema.prisma: `childAge   String?`. Wait! openapi.yaml says `childAge: { type: integer, example: 4 }` but in schema it's String?.
    // Let's just stringify it if it's a number.
    const childAge = createEnquiryDto.childAge
      ? String(createEnquiryDto.childAge)
      : undefined;

    return this.prisma.client.enquiry.create({
      data: {
        parentName: createEnquiryDto.parentName,
        phone: createEnquiryDto.phone,
        branch: createEnquiryDto.branch,
        childAge,
        message: createEnquiryDto.message,
      },
    });
  }

  async findAll(query: GetEnquiriesQueryDto) {
    const { page = 1, limit = 20, status, branch } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (branch) where.branch = branch;

    const [data, total] = await Promise.all([
      this.prisma.client.enquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.enquiry.count({ where }),
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

  async findOne(id: string) {
    const enquiry = await this.prisma.client.enquiry.findUnique({
      where: { id },
      include: { notes: true },
    });
    if (!enquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }
    return enquiry;
  }

  async updateStatus(id: string, updateDto: UpdateEnquiryStatusDto) {
    return this.prisma.client.enquiry.update({
      where: { id },
      data: { status: updateDto.status },
    });
  }

  async addNote(
    enquiryId: string,
    authorId: string,
    noteDto: CreateEnquiryNoteDto,
  ) {
    return this.prisma.client.enquiryNote.create({
      data: {
        enquiryId,
        authorId,
        note: noteDto.note,
      },
    });
  }
}
