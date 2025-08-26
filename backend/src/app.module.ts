import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ResponsibilitiesModule } from './responsibilities/responsibilities.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule,
    AuthModule, 
    ResponsibilitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}