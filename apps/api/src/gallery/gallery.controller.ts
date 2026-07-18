import { Controller, Get, Post, Body, Delete, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { GetGalleryQueryDto } from './dto/get-gallery-query.dto';
import { BetterAuthGuard } from '../common/guards/better-auth.guard';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @ApiOperation({ summary: 'List gallery items (public)' })
  findAll(@Query() query: GetGalleryQueryDto) {
    return this.galleryService.findAll(query);
  }

  @Post()
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Add a gallery item (admin)' })
  create(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.create(createGalleryDto);
  }

  @Delete(':id')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a gallery item (admin)' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
