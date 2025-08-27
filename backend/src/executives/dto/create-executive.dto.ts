import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateExecutiveDto {
  @ApiProperty({ description: '임원 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '사원번호' })
  @IsString()
  employeeNo?: string;

  @ApiProperty({ description: '직위' })
  @IsString()
  positionLabel?: string;

  @ApiProperty({ description: '직책' })
  @IsString()
  titleLabel?: string;

  @ApiProperty({ description: '전화번호' })
  @IsString()
  phone?: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: '재임 시작일' })
  @IsDateString()
  termStartDate?: string;

  @ApiPropertyOptional({ description: '재임 종료일' })
  @IsOptional()
  @IsDateString()
  termEndDate?: string;
}
