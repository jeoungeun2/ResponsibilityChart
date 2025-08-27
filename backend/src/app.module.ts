import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ResponsibilitiesModule } from './responsibilities/responsibilities.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExecutivesModule } from './executives/executives.module';
import { OrgRegistrationsModule } from './org-registrations/org-registrations.module';
import { QualiItemDtoTsModule } from './quali-item.dto.ts/quali-item.dto.ts.module';
import { IntegrityItemModule } from './integrity-item/integrity-item.module';
import { EvaluationsModule } from './evaluations/evaluations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule,
    AuthModule, 
    ResponsibilitiesModule, ExecutivesModule, OrgRegistrationsModule, QualiItemDtoTsModule, IntegrityItemModule, EvaluationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}