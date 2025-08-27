import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export enum IntegrityCategory {
  DISCIPLINARY_LOOKUP = 'DISCIPLINARY_LOOKUP',      // 징계이력 조회
  CRIMINAL_RECORD_LOOKUP = 'CRIMINAL_RECORD_LOOKUP', // 범죄이력 조회
  DISQUALIFICATION_LOOKUP = 'DISQUALIFICATION_LOOKUP', // 자격정지이력 조회
  LAW_TRAINING_ISSUE = 'LAW_TRAINING_ISSUE',        // 법률교육 이수
  OTHER = 'OTHER'                                    // 기타
}

export enum IntegrityResult {
  NONE = 'NONE',     // 해당없음
  ISSUE = 'ISSUE',   // 이슈발견
  PASSED = 'PASSED', // 통과
  FAILED = 'FAILED'  // 실패
}

export class CreateIntegrityItemDto {
  @ApiProperty({ description: '임원 ID', format: 'uuid' })
  @IsUUID()
  executiveId: string;

  @ApiProperty({ 
    description: '정직성 항목 카테고리', 
    enum: IntegrityCategory 
  })
  @IsEnum(IntegrityCategory)
  category: IntegrityCategory;

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
