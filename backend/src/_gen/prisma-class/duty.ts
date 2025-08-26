import { DutyDetail } from './duty_detail';
import { DutyCategory } from './duty_category';
import { ApiProperty } from '@nestjs/swagger';

export class Duty {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  categoryId: string;

  @ApiProperty({ type: String })
  code: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ isArray: true, type: () => DutyDetail })
  details: DutyDetail[];

  @ApiProperty({ type: () => DutyCategory })
  category: DutyCategory;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
