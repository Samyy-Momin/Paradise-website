import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/create-notice.dto';
import { GetNoticesQueryDto } from './dto/get-notices-query.dto';
import { BetterAuthGuard } from '../common/guards/better-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';

@ApiTags('Notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  @ApiOperation({ summary: 'List published notices (public)' })
  findAll(@Query() query: GetNoticesQueryDto) {
    return this.noticesService.findAll(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a single notice by slug (public)' })
  findOne(@Param('slug') slug: string) {
    return this.noticesService.findOneBySlug(slug);
  }

  @Post()
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Create a notice (admin)' })
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticesService.create(createNoticeDto);
  }

  @Patch(':id')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update a notice (admin)' })
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticesService.update(id, updateNoticeDto);
  }

  @Delete(':id')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a notice (admin)' })
  remove(@Param('id') id: string) {
    return this.noticesService.remove(id);
  }
}
