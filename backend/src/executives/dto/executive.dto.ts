import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateExecutiveDto {
  @ApiProperty() @IsString() name: string;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  employeeNo?: string;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  positionLabel?: string;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  titleLabel?: string;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  phone?: string;

  @ApiProperty({ required: false }) @IsOptional() @IsEmail()
  email?: string;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional() @IsDateString() termStartDate?: string;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional() @IsDateString() termEndDate?: string;
}

export class UpdateExecutiveDto extends PartialType(CreateExecutiveDto) {}