import { Module } from '@nestjs/common';
import { ResponsibilitiesService } from './responsibilities.service';
import { ResponsibilitiesController } from './responsibilities.controller';

@Module({
  imports: [],
  controllers: [ResponsibilitiesController],
  providers: [ResponsibilitiesService],
  exports: [ResponsibilitiesService],
})
export class ResponsibilitiesModule {}
