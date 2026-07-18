import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { BetterAuthGuard } from '../common/guards/better-auth.guard';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get()
  @ApiOperation({ summary: 'List faculty members (public)' })
  findAll() {
    return this.facultyService.findAll();
  }

  @Post()
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Add a faculty member (admin)' })
  create(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultyService.create(createFacultyDto);
  }

  @Delete(':id')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a faculty member (admin)' })
  remove(@Param('id') id: string) {
    return this.facultyService.remove(id);
  }

  @Patch(':id')
  @UseGuards(BetterAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update a faculty member (admin)' })
  update(@Param('id') id: string, @Body() updateFacultyDto: CreateFacultyDto) {
    return this.facultyService.update(id, updateFacultyDto);
  }
}
