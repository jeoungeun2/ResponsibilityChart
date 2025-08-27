import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export enum CommitteeRole {
  CHAIR = 'CHAIR',           // 위원장
  MEMBER = 'MEMBER'          // 위원
}

export enum MeetingFrequency {
  WEEKLY = 'WEEKLY',         // 주간
  MONTHLY = 'MONTHLY',       // 월간
  QUARTERLY = 'QUARTERLY',   // 분기
  SEMI_ANNUAL = 'SEMI_ANNUAL', // 반기
  ANNUAL = 'ANNUAL',         // 연간
  AD_HOC = 'AD_HOC'         // 수시
}

export class OrgRegistrationDto {
  @ApiProperty({ description: '조직등록 ID', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '임원 ID', format: 'uuid' })
  @IsUUID()
  executiveId: string;

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

  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @ApiProperty({ description: '수정일시' })
  updatedAt: Date;
}

// 기존 UpsertOrgRegistrationDto는 유지 (참고용)
export class UpsertOrgRegistrationDto {
  @ApiProperty({ required: false }) @IsOptional() @IsString()
  managingOrg?: string;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  division?: string;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  team?: string;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  councilBody?: string;

  @ApiProperty({ required: false, enum: CommitteeRole })
  @IsOptional() @IsEnum(CommitteeRole) committeeRole?: CommitteeRole;

  @ApiProperty({ required: false, enum: MeetingFrequency })
  @IsOptional() @IsEnum(MeetingFrequency) meetingFreq?: MeetingFrequency;

  @ApiProperty({ required: false }) @IsOptional() @IsString()
  majorAgenda?: string;
}

export class PatchOrgRegistrationDto extends UpsertOrgRegistrationDto {}