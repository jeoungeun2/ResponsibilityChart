import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

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
    enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
    description: '상태(미보내면 NOT_STARTED)',
  })
  @IsOptional()
  @IsEnum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'])
  status?: string; // 미전송 시 DB 기본값 NOT_STARTED
}