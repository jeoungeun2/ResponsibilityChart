import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 책무 세부 생성 DTO
export class CreateDutyDetailDto {
  @ApiProperty({ description: '책무 세부코드', example: 'AM-경영관리-C11-A' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '책무 세부내용', example: '경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

// 책무 생성 DTO
export class CreateDutyDto {
  @ApiProperty({ description: '책무코드', example: 'AM-경영관리-C11' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '책무명', example: '경영지원업무와 관련된 책무' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '책무구분 ID', example: 'uuid-string' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({ description: '책무 세부내용 목록', type: [CreateDutyDetailDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDutyDetailDto)
  details?: CreateDutyDetailDto[];
}
