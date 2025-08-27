import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateIntegrityItemDto, IntegrityCategory, IntegrityResult } from './create-integrity-item.dto';

export class UpdateIntegrityItemDto extends PartialType(CreateIntegrityItemDto) {
  @ApiPropertyOptional({ description: '임원 ID', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  executiveId?: string;

  @ApiPropertyOptional({ 
    description: '정직성 항목 카테고리', 
    enum: IntegrityCategory 
  })
  @IsOptional()
  @IsEnum(IntegrityCategory)
  category?: IntegrityCategory;

  @ApiPropertyOptional({ 
    description: '정직성 검증 결과', 
    enum: IntegrityResult 
  })
  @IsOptional()
  @IsEnum(IntegrityResult)
  result?: IntegrityResult;

  @ApiPropertyOptional({ description: '내용 (해당없음 등)' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: '비고' })
  @IsOptional()
  @IsString()
  note?: string;
}
