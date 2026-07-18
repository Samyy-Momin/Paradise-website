import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  phones?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  hours?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  instagramUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  facebookUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  threadsUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalMessage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalImage?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  heroImages?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  marqueeText?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  aboutImages?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  parentInvolvementImage?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  instagramReels?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  extracurricularImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  eventsImage?: string;
}
