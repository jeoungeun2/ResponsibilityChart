import { Duty } from './duty';
import { ApiProperty } from '@nestjs/swagger';

export class DutyDetail {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  dutyId: string;

  @ApiProperty({ type: String })
  code: string;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: () => Duty })
  duty: Duty;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
