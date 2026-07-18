import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GalleryCategoriesService } from './gallery-categories.service';
import { Prisma } from '@prisma/client';
import { BetterAuthGuard } from '../common/guards/better-auth.guard';

@Controller('gallery-categories')
export class GalleryCategoriesController {
  constructor(private readonly galleryCategoriesService: GalleryCategoriesService) {}

  @Post()
  @UseGuards(BetterAuthGuard)
  create(@Body() createGalleryCategoryDto: Prisma.GalleryCategoryCreateInput) {
    return this.galleryCategoriesService.create(createGalleryCategoryDto);
  }

  @Get()
  findAll() {
    return this.galleryCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryCategoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(BetterAuthGuard)
  update(@Param('id') id: string, @Body() updateGalleryCategoryDto: Prisma.GalleryCategoryUpdateInput) {
    return this.galleryCategoriesService.update(id, updateGalleryCategoryDto);
  }

  @Delete(':id')
  @UseGuards(BetterAuthGuard)
  remove(@Param('id') id: string) {
    return this.galleryCategoriesService.remove(id);
  }
}
