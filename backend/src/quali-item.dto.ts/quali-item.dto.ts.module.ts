import { Module } from '@nestjs/common';
import { QualiItemDtoTsController } from './quali-item.dto.ts.controller';
import { QualiItemDtoTsService } from './quali-item.dto.ts.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QualiItemDtoTsController],
  providers: [QualiItemDtoTsService],
  exports: [QualiItemDtoTsService], // 다른 모듈에서 사용할 수 있도록 export
})
export class QualiItemDtoTsModule {}
