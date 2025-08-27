import { Executive } from './executive';
import { CommitteeRole, MeetingFrequency } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExecutiveOrgRegistration {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  executiveId: string;

  @ApiProperty({ type: () => Executive })
  executive: Executive;

  @ApiPropertyOptional({ type: String })
  managingOrg?: string;

  @ApiPropertyOptional({ type: String })
  division?: string;

  @ApiPropertyOptional({ type: String })
  team?: string;

  @ApiPropertyOptional({ type: String })
  councilBody?: string;

  @ApiPropertyOptional({ enum: CommitteeRole, enumName: 'CommitteeRole' })
  committeeRole?: CommitteeRole;

  @ApiPropertyOptional({ enum: MeetingFrequency, enumName: 'MeetingFrequency' })
  meetingFreq?: MeetingFrequency;

  @ApiPropertyOptional({ type: String })
  majorAgenda?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
