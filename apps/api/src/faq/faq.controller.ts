import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { Prisma } from '@prisma/client';
import { BetterAuthGuard } from '../common/guards/better-auth.guard';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @UseGuards(BetterAuthGuard)
  create(@Body() createFaqDto: Prisma.FAQItemCreateInput) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(BetterAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: Prisma.FAQItemUpdateInput,
  ) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @UseGuards(BetterAuthGuard)
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
