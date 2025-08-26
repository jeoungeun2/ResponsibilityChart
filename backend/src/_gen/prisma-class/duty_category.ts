import { Duty } from './duty';
import { ApiProperty } from '@nestjs/swagger';

export class DutyCategory {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ isArray: true, type: () => Duty })
  duties: Duty[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
