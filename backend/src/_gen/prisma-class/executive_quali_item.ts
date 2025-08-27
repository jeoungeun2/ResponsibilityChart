import { Executive } from './executive';
import { QualiType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExecutiveQualiItem {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  executiveId: string;

  @ApiProperty({ type: () => Executive })
  executive: Executive;

  @ApiProperty({ enum: QualiType, enumName: 'QualiType' })
  type: QualiType;

  @ApiPropertyOptional({ type: String })
  companyName?: string;

  @ApiPropertyOptional({ type: String })
  positionLabel?: string;

  @ApiPropertyOptional({ type: String })
  titleLabel?: string;

  @ApiPropertyOptional({ type: Date })
  periodStart?: Date;

  @ApiPropertyOptional({ type: Date })
  periodEnd?: Date;

  @ApiPropertyOptional({ type: String })
  content?: string;

  @ApiPropertyOptional({ type: Date })
  occurredAt?: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
