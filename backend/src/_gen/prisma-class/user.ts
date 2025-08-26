import { Account } from './account';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiPropertyOptional({ type: Date })
  emailVerified?: Date;

  @ApiPropertyOptional({ type: String })
  hashedPassword?: string;

  @ApiPropertyOptional({ type: String })
  image?: string;

  @ApiProperty({ isArray: true, type: () => Account })
  accounts: Account[];
}
