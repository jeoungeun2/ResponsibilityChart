import { Module } from '@nestjs/common';
import { OrgRegistrationsController } from './org-registrations.controller';
import { OrgRegistrationsService } from './org-registrations.service';

@Module({
  imports: [],
  controllers: [OrgRegistrationsController],
  providers: [OrgRegistrationsService],
  exports: [OrgRegistrationsService], // 다른 모듈에서 사용할 수 있도록 export
})
export class OrgRegistrationsModule {}
