import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EvaluationStatus } from '@prisma/client';

export class CreateEvaluationDto {
  @ApiPropertyOptional({ description: '평가결과(자유 입력). 생성시 비워도 됨' })
  @IsOptional()
  @IsString()
  evaluationResult?: string;

  @ApiPropertyOptional({ description: '판단사유(자유 입력). 생성시 비워도 됨' })
  @IsOptional()
  @IsString()
  decisionReason?: string;

  @ApiPropertyOptional({
    enum: EvaluationStatus,
    description: '상태(미보내면 NOT_STARTED)',
  })
  @IsOptional()
  @IsEnum(EvaluationStatus)
  status?: EvaluationStatus; // 미전송 시 DB 기본값 NOT_STARTED
}