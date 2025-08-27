import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional, IsString, ValidateNested, IsUUID } from 'class-validator';

export enum QualiType { 
  WORK = 'WORK',           // 업무경험
  EDUCATION = 'EDUCATION', // 학력
  AWARD = 'AWARD',         // 수상내역
  CERT = 'CERT',           // 자격증
  OTHER = 'OTHER'          // 기타
}

export class QualiItemDto {
  @ApiProperty({ description: '업무경험/전문성 항목 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '임원 ID', format: 'uuid' })
  @IsUUID()
  executiveId: string;

  @ApiProperty({ 
    description: '업무경험/전문성 유형', 
    enum: QualiType 
  })
  @IsEnum(QualiType)
  type: QualiType;

  // WORK(업무경험) 전용 필드
  @ApiPropertyOptional({ description: '회사명' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ description: '직위' })
  @IsOptional()
  @IsString()
  positionLabel?: string;

  @ApiPropertyOptional({ description: '직책' })
  @IsOptional()
  @IsString()
  titleLabel?: string;

  @ApiPropertyOptional({ 
    description: '재직 시작일', 
    type: String, 
    format: 'date-time' 
  })
  @IsOptional()
  @IsDateString()
  periodStart?: string;

  @ApiPropertyOptional({ 
    description: '재직 종료일', 
    type: String, 
    format: 'date-time' 
  })
  @IsOptional()
  @IsDateString()
  periodEnd?: string;

  // EDUCATION/AWARD/CERT/OTHER 전용 필드
  @ApiPropertyOptional({ description: '내용(학력, 수상내역, 자격증명 등)' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ 
    description: '발생일자', 
    type: String, 
    format: 'date-time' 
  })
  @IsOptional()
  @IsDateString()
  occurredAt?: string;

  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @ApiProperty({ description: '수정일시' })
  updatedAt: Date;
}

// 기존 ReplaceQualiItemsDto는 유지 (참고용)
export class ReplaceQualiItemsDto {
  @ApiProperty({ type: [QualiItemDto] })
  @ValidateNested({ each: true })
  @Type(() => QualiItemDto)
  items: QualiItemDto[];
}