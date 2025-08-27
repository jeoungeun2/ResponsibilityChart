import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { CreateQualiItemDto, QualiType } from './create-quali-item.dto';

export class UpdateQualiItemDto extends PartialType(CreateQualiItemDto) {
  @ApiPropertyOptional({ description: '임원 ID', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  executiveId?: string;

  @ApiPropertyOptional({ 
    description: '업무경험/전문성 유형', 
    enum: QualiType 
  })
  @IsOptional()
  @IsEnum(QualiType)
  type?: QualiType;

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
}
