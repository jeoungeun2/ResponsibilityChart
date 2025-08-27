import { ExecutiveOrgRegistration } from './executive_org_registration';
import { ExecutiveQualiItem } from './executive_quali_item';
import { ExecutiveIntegrityItem } from './executive_integrity_item';
import { ExecutiveEvaluation } from './executive_evaluation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Executive {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  employeeNo?: string;

  @ApiPropertyOptional({ type: String })
  positionLabel?: string;

  @ApiPropertyOptional({ type: String })
  titleLabel?: string;

  @ApiPropertyOptional({ type: String })
  phone?: string;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiPropertyOptional({ type: Date })
  termStartDate?: Date;

  @ApiPropertyOptional({ type: Date })
  termEndDate?: Date;

  @ApiPropertyOptional({ type: () => ExecutiveOrgRegistration })
  orgReg?: ExecutiveOrgRegistration;

  @ApiProperty({ isArray: true, type: () => ExecutiveQualiItem })
  qualiItems: ExecutiveQualiItem[];

  @ApiProperty({ isArray: true, type: () => ExecutiveIntegrityItem })
  integrity: ExecutiveIntegrityItem[];

  @ApiPropertyOptional({ type: () => ExecutiveEvaluation })
  evaluation?: ExecutiveEvaluation;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
