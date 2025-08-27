import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';
import { CreateExecutiveDto } from './create-executive.dto';

export class UpdateExecutiveDto extends PartialType(CreateExecutiveDto) {
  @ApiPropertyOptional({ description: '임원 이름' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '사원번호' })
  @IsOptional()
  @IsString()
  employeeNo?: string;

  @ApiPropertyOptional({ description: '직위' })
  @IsOptional()
  @IsString()
  positionLabel?: string;

  @ApiPropertyOptional({ description: '직책' })
  @IsOptional()
  @IsString()
  titleLabel?: string;

  @ApiPropertyOptional({ description: '전화번호' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: '이메일' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: '재임 시작일' })
  @IsOptional()
  @IsDateString()
  termStartDate?: string;

  @ApiPropertyOptional({ description: '재임 종료일' })
  @IsOptional()
  @IsDateString()
  termEndDate?: string;
}
