import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateEvaluationDto } from './create-evaluation.dto';
export class PatchEvaluationDto extends PartialType(CreateEvaluationDto) {
  @ApiPropertyOptional({ description: '평가결과(자유 입력)' })
  @IsOptional()
  @IsString()
  evaluationResult?: string;

  @ApiPropertyOptional({ description: '판단사유(자유 입력)' })
  @IsOptional()
  @IsString()
  decisionReason?: string;

  @ApiPropertyOptional({ 
    enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], 
    description: '상태 변경' 
  })
  @IsOptional()
  @IsEnum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'])
  status?: string; // NOT_STARTED | IN_PROGRESS | COMPLETED
}
