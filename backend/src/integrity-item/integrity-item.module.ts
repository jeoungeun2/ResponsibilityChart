import { Module } from '@nestjs/common';
import { IntegrityItemController } from './integrity-item.controller';
import { IntegrityItemService } from './integrity-item.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IntegrityItemController],
  providers: [IntegrityItemService],
  exports: [IntegrityItemService], // 다른 모듈에서 사용할 수 있도록 export
})
export class IntegrityItemModule {}
