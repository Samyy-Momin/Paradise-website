import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnquiryBranch, EnquiryStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty({ example: 'Rakesh Sharma' })
  @IsString()
  parentName: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: 4 })
  @IsInt()
  @Min(1)
  @Max(18)
  @IsOptional()
  childAge?: number;

  @ApiProperty({ enum: EnquiryBranch })
  @IsEnum(EnquiryBranch)
  branch: EnquiryBranch;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  message?: string;
}

export class UpdateEnquiryStatusDto {
  @ApiProperty({ enum: EnquiryStatus })
  @IsEnum(EnquiryStatus)
  status: EnquiryStatus;
}

export class CreateEnquiryNoteDto {
  @ApiProperty()
  @IsString()
  note: string;
}
