import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDutyDetailDto } from './create-duty.dto';

// 책무 세부 수정 DTO
export class UpdateDutyDetailDto {
  @ApiPropertyOptional({ description: '책무 세부코드', example: 'AM-경영관리-C11-A' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @ApiPropertyOptional({ description: '책무 세부내용', example: '경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}

// 책무 수정 DTO
export class UpdateDutyDto {
  @ApiPropertyOptional({ description: '책무코드', example: 'AM-경영관리-C11' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @ApiPropertyOptional({ description: '책무명', example: '경영지원업무와 관련된 책무' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: '책무구분 ID', example: 'uuid-string' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;

  @ApiPropertyOptional({ description: '책무 세부내용 목록', type: [UpdateDutyDetailDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDutyDetailDto)
  details?: UpdateDutyDetailDto[];
}
