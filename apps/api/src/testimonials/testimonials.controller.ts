import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req, Delete } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { GetTestimonialsQueryDto } from './dto/get-testimonials-query.dto';
import { BetterAuthGuard } from '../common/guards/better-auth.guard';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'List approved testimonials (public)' })
  async findAll(@Query() query: GetTestimonialsQueryDto, @Req() req: any) {
    // Check if user is admin based on auth cookie
    // We cannot use @UseGuards here because it's a public route, but we want to know if there's a user.
    // Instead of complex logic, the service checks if isAdmin = true.
    // Let's rely on the session if available to allow includeUnapproved.
    let isAdmin = false;
    if (req.headers && req.headers.cookie) {
      const { auth } = require('../auth/auth');
      const session = await auth.api.getSession({ headers: req.headers });
      if (session?.user) {
        isAdmin = true;
      }
    }
    return this.testimonialsService.findAll(query, isAdmin);
  }

  @Post()
  @ApiOperation({ summary: 'Submit a testimonial (public)' })
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Patch(':id/approve')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Approve a testimonial (admin)' })
  approve(@Param('id') id: string) {
    return this.testimonialsService.approve(id);
  }

  @Delete(':id')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Delete a testimonial (admin)' })
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}
