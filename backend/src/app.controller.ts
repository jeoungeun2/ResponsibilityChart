import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import type { Request } from 'express';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user-test')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '사용자 테스트 API', description: 'JWT 토큰으로 인증된 사용자 정보 조회' })
  @ApiResponse({ status: 200, description: '성공', schema: { type: 'string' } })
  @ApiResponse({ status: 401, description: '인증 실패' })
  testUser(@Req() req: Request) {
    // 타입 안전성 개선
    if (!req.user) {
      throw new Error('사용자 정보가 없습니다');
    }
    
    console.log(req.user);
    return `유저 이메일: ${req.user.email}`;
  }
}