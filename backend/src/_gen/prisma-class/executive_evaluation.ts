import { Executive } from './executive';
import { EvaluationStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExecutiveEvaluation {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  executiveId: string;

  @ApiProperty({ type: () => Executive })
  executive: Executive;

  @ApiPropertyOptional({ type: String })
  evaluationResult?: string;

  @ApiPropertyOptional({ type: String })
  decisionReason?: string;

  @ApiProperty({ enum: EvaluationStatus, enumName: 'EvaluationStatus' })
  status: EvaluationStatus = EvaluationStatus.NOT_STARTED;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
