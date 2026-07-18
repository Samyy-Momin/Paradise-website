import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto, UpdateEnquiryStatusDto, CreateEnquiryNoteDto } from './dto/create-enquiry.dto';
import { GetEnquiriesQueryDto } from './dto/get-enquiries-query.dto';
import { BetterAuthGuard } from '../common/guards/better-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Enquiries')
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
  @ApiOperation({ summary: 'Submit an admission enquiry (public)' })
  @ApiResponse({ status: 201, description: 'Enquiry created' })
  create(@Body() createEnquiryDto: CreateEnquiryDto) {
    return this.enquiriesService.create(createEnquiryDto);
  }

  @Get()
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'List enquiries (admin)' })
  findAll(@Query() query: GetEnquiriesQueryDto) {
    return this.enquiriesService.findAll(query);
  }

  @Get(':id')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get a single enquiry with its notes' })
  findOne(@Param('id') id: string) {
    return this.enquiriesService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update enquiry pipeline stage' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateEnquiryStatusDto) {
    return this.enquiriesService.updateStatus(id, updateDto);
  }

  @Post(':id/notes')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a follow-up note to an enquiry' })
  addNote(
    @Param('id') id: string,
    @Req() req: any,
    @Body() noteDto: CreateEnquiryNoteDto
  ) {
    return this.enquiriesService.addNote(id, req.user.id, noteDto);
  }
}
