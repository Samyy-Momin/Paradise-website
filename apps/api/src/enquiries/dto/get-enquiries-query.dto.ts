import { ApiPropertyOptional } from '@nestjs/swagger';
import { EnquiryBranch, EnquiryStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

export class GetEnquiriesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: EnquiryStatus })
  @IsEnum(EnquiryStatus)
  @IsOptional()
  status?: EnquiryStatus;

  @ApiPropertyOptional({ enum: EnquiryBranch })
  @IsEnum(EnquiryBranch)
  @IsOptional()
  branch?: EnquiryBranch;
}
