import { Executive } from './executive';
import { IntegrityCategory, IntegrityResult } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExecutiveIntegrityItem {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  executiveId: string;

  @ApiProperty({ type: () => Executive })
  executive: Executive;

  @ApiProperty({ enum: IntegrityCategory, enumName: 'IntegrityCategory' })
  category: IntegrityCategory;

  @ApiPropertyOptional({ enum: IntegrityResult, enumName: 'IntegrityResult' })
  result?: IntegrityResult;

  @ApiPropertyOptional({ type: String })
  content?: string;

  @ApiPropertyOptional({ type: String })
  note?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
