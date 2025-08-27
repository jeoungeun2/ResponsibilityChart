import { Module } from '@nestjs/common';
import { ExecutivesService } from './executives.service';
import { ExecutivesController } from './executives.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExecutivesController],
  providers: [ExecutivesService],
})
export class ExecutivesModule {}
