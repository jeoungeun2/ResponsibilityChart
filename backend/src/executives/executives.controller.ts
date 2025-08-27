import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExecutivesService } from './executives.service';
import { CreateExecutiveDto } from './dto/create-executive.dto';
import { UpdateExecutiveDto } from './dto/update-executive.dto';
import { SearchExecutiveDto } from './dto/search-executive.dto';
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
  ApiQuery,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('executives')
@ApiBearerAuth('access-token')        // Swagger에 Authorize 버튼 추가
@UseGuards(AccessTokenGuard)          // JWT 인증 필수
@UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // 모든 엔드포인트에 ValidationPipe 적용
@Controller('executives')
export class ExecutivesController {
  constructor(private readonly executivesService: ExecutivesService) {}

  /**
   * 임원 생성
   */
  @Post()
  @ApiOperation({ summary: '임원 생성' })
  @ApiBody({ type: CreateExecutiveDto })
  @ApiCreatedResponse({ description: '임원이 생성되었습니다.' })
  @ApiConflictResponse({ description: '이미 존재하는 임원입니다.' })
  create(@Body() dto: CreateExecutiveDto) {
    return this.executivesService.create(dto);
  }

  /**
   * 모든 임원 조회
   */
  @Get()
  @ApiOperation({ summary: '모든 임원 조회' })
  @ApiOkResponse({ description: '모든 임원 목록 반환' })
  findAll() {
    return this.executivesService.findAll();
  }

  /**
   * 임원 검색 (offset 기반 페이지네이션, 필터링, 정렬 지원)
   */
  @Get('search')
  @ApiOperation({ summary: '임원 목록 검색 (offset 기반 페이지네이션)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호 (기본값: 1)' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: '페이지당 항목 수 (기본값: 10, 최대: 100)' })
  @ApiQuery({ name: 'keyword', required: false, type: String, description: '검색 키워드 (이름/이메일)' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'createdAt', 'email', 'positionLabel'], description: '정렬 기준' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: '정렬 순서' })
  @ApiQuery({ name: 'startDate', required: false, type: String, description: '시작 날짜 (ISO 문자열)' })
  @ApiQuery({ name: 'endDate', required: false, type: String, description: '종료 날짜 (ISO 문자열)' })
  @ApiQuery({ name: 'evaluationStatus', required: false, enum: ['NOT_STARTED', 'STARTED', 'IN_PROGRESS'], description: '평가 상태 필터' })
  @ApiQuery({ name: 'qualiItemType', required: false, enum: ['WORK', 'EDUCATION', 'AWARD', 'CERT', 'OTHER'], description: '자격/경험 유형 필터' })
  @ApiQuery({ name: 'integrityCategory', required: false, enum: ['DISCIPLINARY_LOOKUP', 'CRIMINAL_RECORD_LOOKUP', 'DISQUALIFICATION_LOOKUP', 'LAW_TRAINING_ISSUE', 'OTHER'], description: '정직성 카테고리 필터' })
  async search(@Query() query: SearchExecutiveDto) {
    return this.executivesService.search(query);
  }

  /**
   * 이름으로 임원 검색
   */
  @Get('search/:name')
  @ApiOperation({ summary: '이름으로 임원 검색' })
  @ApiParam({ name: 'name', type: 'string' })
  @ApiOkResponse({ description: '검색 결과 반환' })
  findByName(@Param('name') name: string) {
    return this.executivesService.findByName(name);
  }

  /**
   * 임원 단건 조회 (id 기준)
   */
  @Get(':id')
  @ApiOperation({ summary: '임원 단건 조회' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '임원 단건 반환' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.executivesService.findOne(id);
  }

  /**
   * 임원 수정
   */
  @Patch(':id')
  @ApiOperation({ summary: '임원 수정' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateExecutiveDto })
  @ApiOkResponse({ description: '임원이 수정되었습니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateExecutiveDto,
  ) {
    return this.executivesService.update(id, dto);
  }

  /**
   * 임원 삭제
   */
  @Delete(':id')
  @ApiOperation({ summary: '임원 삭제' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '임원이 수정되었습니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.executivesService.remove(id);
  }
}
