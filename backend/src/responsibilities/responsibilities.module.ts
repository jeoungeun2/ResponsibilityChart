import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponsibilitiesService } from './responsibilities.service';
import { ResponsibilitiesController } from './responsibilities.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ResponsibilitiesController],
  providers: [ResponsibilitiesService],
  exports: [ResponsibilitiesService],
})
export class ResponsibilitiesModule {}
