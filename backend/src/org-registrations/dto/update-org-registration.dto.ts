import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateOrgRegistrationDto, CommitteeRole, MeetingFrequency } from './create-org-registration.dto';

export class UpdateOrgRegistrationDto extends PartialType(CreateOrgRegistrationDto) {
  @ApiPropertyOptional({ description: '임원 ID', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  executiveId?: string;

  @ApiPropertyOptional({ description: '관리대상조직' })
  @IsOptional()
  @IsString()
  managingOrg?: string;

  @ApiPropertyOptional({ description: '소관부서/본부' })
  @IsOptional()
  @IsString()
  division?: string;

  @ApiPropertyOptional({ description: '소관팀' })
  @IsOptional()
  @IsString()
  team?: string;

  @ApiPropertyOptional({ description: '관할의체(위원회명 등)' })
  @IsOptional()
  @IsString()
  councilBody?: string;

  @ApiPropertyOptional({ 
    description: '위원장/위원', 
    enum: CommitteeRole 
  })
  @IsOptional()
  @IsEnum(CommitteeRole)
  committeeRole?: CommitteeRole;

  @ApiPropertyOptional({ 
    description: '개최주기', 
    enum: MeetingFrequency 
  })
  @IsOptional()
  @IsEnum(MeetingFrequency)
  meetingFreq?: MeetingFrequency;

  @ApiPropertyOptional({ description: '주요 심의·의결사항' })
  @IsOptional()
  @IsString()
  majorAgenda?: string;
}
