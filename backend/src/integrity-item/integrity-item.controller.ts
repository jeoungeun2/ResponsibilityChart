import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IntegrityItemService } from './integrity-item.service';
import { CreateIntegrityItemDto } from './dto/create-integrity-item.dto';
import { UpdateIntegrityItemDto } from './dto/update-integrity-item.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('integrity-items')
@ApiBearerAuth('access-token')        // Swagger에 Authorize 버튼 추가
@UseGuards(AccessTokenGuard)          // JWT 인증 필수
@Controller('integrity-items')
export class IntegrityItemController {
  constructor(private readonly integrityItemService: IntegrityItemService) {}

  /**
   * 정직성 항목 생성
   */
  @Post()
  @ApiOperation({ summary: '정직성 항목 생성' })
  @ApiBody({ type: CreateIntegrityItemDto })
  @ApiCreatedResponse({ description: '정직성 항목이 생성되었습니다.' })
  @ApiConflictResponse({ description: '해당 임원의 동일한 카테고리 항목이 이미 존재합니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  create(@Body() dto: CreateIntegrityItemDto) {
    return this.integrityItemService.create(dto);
  }

  /**
   * 정직성 항목 단건 조회 (id 기준)
   */
  @Get(':id')
  @ApiOperation({ summary: '정직성 항목 단건 조회' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '정직성 항목 단건 반환' })
  @ApiNotFoundResponse({ description: '정직성 항목을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.integrityItemService.findOne(id);
  }

  /**
   * 모든 정직성 항목 조회
   */
  @Get()
  @ApiOperation({ summary: '모든 정직성 항목 조회' })
  @ApiOkResponse({ description: '모든 정직성 항목 목록 반환' })
  findAll() {
    return this.integrityItemService.findAll();
  }

  /**
   * 특정 임원의 정직성 항목 조회
   */
  @Get('executive/:executiveId')
  @ApiOperation({ summary: '특정 임원의 정직성 항목 조회' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '해당 임원의 정직성 항목 목록 반환' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  findByExecutiveId(@Param('executiveId', ParseUUIDPipe) executiveId: string) {
    return this.integrityItemService.findByExecutiveId(executiveId);
  }

  /**
   * 카테고리별 정직성 항목 조회
   */
  @Get('category/:category')
  @ApiOperation({ summary: '카테고리별 정직성 항목 조회' })
  @ApiParam({ name: 'category', type: 'string', enum: ['DISCIPLINARY_LOOKUP', 'CRIMINAL_RECORD_LOOKUP', 'DISQUALIFICATION_LOOKUP', 'LAW_TRAINING_ISSUE', 'OTHER'] })
  @ApiOkResponse({ description: '해당 카테고리의 정직성 항목 목록 반환' })
  findByCategory(@Param('category') category: string) {
    return this.integrityItemService.findByCategory(category);
  }

  /**
   * 정직성 항목 수정
   */
  @Patch(':id')
  @ApiOperation({ summary: '정직성 항목 수정' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateIntegrityItemDto })
  @ApiOkResponse({ description: '정직성 항목이 수정되었습니다.' })
  @ApiNotFoundResponse({ description: '정직성 항목을 찾을 수 없습니다.' })
  @ApiConflictResponse({ description: '해당 임원의 동일한 카테고리 항목이 이미 존재합니다.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateIntegrityItemDto,
  ) {
    return this.integrityItemService.update(id, dto);
  }

  /**
   * 정직성 항목 삭제
   */
  @Delete(':id')
  @ApiOperation({ summary: '정직성 항목 삭제' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '정직성 항목이 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '정직성 항목을 찾을 수 없습니다.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.integrityItemService.remove(id);
  }

  /**
   * 특정 임원의 모든 정직성 항목 삭제
   */
  @Delete('executive/:executiveId')
  @ApiOperation({ summary: '특정 임원의 모든 정직성 항목 삭제' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '해당 임원의 모든 정직성 항목이 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  removeByExecutiveId(@Param('executiveId', ParseUUIDPipe) executiveId: string) {
    return this.integrityItemService.removeByExecutiveId(executiveId);
  }
}
