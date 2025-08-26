import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
  Req
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiResponse, ApiParam, ApiBearerAuth, ApiTags, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import type { Request } from 'express';
import { ResponsibilitiesService } from './responsibilities.service';
import { CreateDutyDto } from './dto/create-duty.dto';
import { UpdateDutyDto } from './dto/update-duty.dto';
import { DutyResponseDto } from './dto/response-duty.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import type { Duty, DutyCategory } from '../../generated/prisma';


@ApiTags('책무 관리')
@Controller('responsibilities')
export class ResponsibilitiesController {
  constructor(private readonly responsibilitiesService: ResponsibilitiesService) {}

  // 책무 생성
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '책무 생성', description: '새로운 책무를 생성합니다.' })
  @ApiCreatedResponse({ 
    description: '책무 생성 성공', 
    type: DutyResponseDto 
  })
  @ApiResponse({ status: 400, description: '잘못된 요청 (중복 코드 등)' })
  create(@Body() createDutyDto: CreateDutyDto) {
    return this.responsibilitiesService.create(createDutyDto);
  }

  // 책무 목록 조회
  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '책무 목록 조회', description: '모든 책무 목록을 조회합니다.' })
  @ApiOkResponse({ 
    description: '책무 목록 조회 성공', 
    type: DutyResponseDto,
    isArray: true
  })
  findAll() {
    return this.responsibilitiesService.findAll();
  }

  // 책무 상세 조회
  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '책무 상세 조회', description: '특정 책무의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '책무 ID' })
  @ApiOkResponse({ 
    description: '책무 상세 조회 성공', 
    type: DutyResponseDto
  })
  @ApiResponse({ status: 404, description: '책무를 찾을 수 없음' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.responsibilitiesService.findOne(id);
  }

  // 책무 수정
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '책무 수정', description: '기존 책무 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '책무 ID' })
  @ApiOkResponse({ 
    description: '책무 수정 성공', 
    type: DutyResponseDto
  })
  @ApiResponse({ status: 404, description: '책무를 찾을 수 없음' })
  @ApiResponse({ status: 400, description: '잘못된 요청 (중복 코드 등)' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDutyDto: UpdateDutyDto,
  ) {
    return this.responsibilitiesService.update(id, updateDutyDto);
  }

  // 책무 삭제
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '책무 삭제', description: '책무를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '책무 ID' })
  @ApiNoContentResponse({ description: '책무 삭제 성공' })
  @ApiResponse({ status: 404, description: '책무를 찾을 수 없음' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.responsibilitiesService.remove(id);
  }

  // 책무구분 목록 조회
  @Get('categories/list')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '책무구분 목록 조회', description: '모든 책무구분 목록을 조회합니다.' })
  @ApiOkResponse({ 
    description: '책무구분 목록 조회 성공',
    type: DutyResponseDto,
    isArray: true
  })
  getCategories() {
    return this.responsibilitiesService.getCategories();
  }
}
