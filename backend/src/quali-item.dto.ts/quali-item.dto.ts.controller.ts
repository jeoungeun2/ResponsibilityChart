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
import { QualiItemDtoTsService } from './quali-item.dto.ts.service';
import { CreateQualiItemDto } from './dto/create-quali-item.dto';
import { UpdateQualiItemDto } from './dto/update-quali-item.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('quali-items')
@ApiBearerAuth('access-token')        // Swagger에 Authorize 버튼 추가
@UseGuards(AccessTokenGuard)          // JWT 인증 필수
@Controller('quali-items')
export class QualiItemDtoTsController {
  constructor(private readonly qualiItemDtoTsService: QualiItemDtoTsService) {}

  /**
   * 업무경험/전문성 항목 생성
   */
  @Post()
  @ApiOperation({ summary: '업무경험/전문성 항목 생성' })
  @ApiBody({ type: CreateQualiItemDto })
  @ApiCreatedResponse({ description: '업무경험/전문성 항목이 생성되었습니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  create(@Body() dto: CreateQualiItemDto) {
    return this.qualiItemDtoTsService.create(dto);
  }

  /**
   * 업무경험/전문성 항목 단건 조회 (id 기준)
   */
  @Get(':id')
  @ApiOperation({ summary: '업무경험/전문성 항목 단건 조회' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '업무경험/전문성 항목 단건 반환' })
  @ApiNotFoundResponse({ description: '업무경험/전문성 항목을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.qualiItemDtoTsService.findOne(id);
  }

  /**
   * 모든 업무경험/전문성 항목 조회
   */
  @Get()
  @ApiOperation({ summary: '모든 업무경험/전문성 항목 조회' })
  @ApiOkResponse({ description: '모든 업무경험/전문성 항목 목록 반환' })
  findAll() {
    return this.qualiItemDtoTsService.findAll();
  }

  /**
   * 특정 임원의 업무경험/전문성 항목 조회
   */
  @Get('executive/:executiveId')
  @ApiOperation({ summary: '특정 임원의 업무경험/전문성 항목 조회' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '해당 임원의 업무경험/전문성 항목 목록 반환' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  findByExecutiveId(@Param('executiveId', ParseUUIDPipe) executiveId: string) {
    return this.qualiItemDtoTsService.findByExecutiveId(executiveId);
  }

  /**
   * 유형별 업무경험/전문성 항목 조회
   */
  @Get('type/:type')
  @ApiOperation({ summary: '유형별 업무경험/전문성 항목 조회' })
  @ApiParam({ name: 'type', type: 'string', enum: ['WORK', 'EDUCATION', 'AWARD', 'CERT', 'OTHER'] })
  @ApiOkResponse({ description: '해당 유형의 업무경험/전문성 항목 목록 반환' })
  findByType(@Param('type') type: string) {
    return this.qualiItemDtoTsService.findByType(type);
  }

  /**
   * 업무경험/전문성 항목 수정
   */
  @Patch(':id')
  @ApiOperation({ summary: '업무경험/전문성 항목 수정' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateQualiItemDto })
  @ApiOkResponse({ description: '업무경험/전문성 항목이 수정되었습니다.' })
  @ApiNotFoundResponse({ description: '업무경험/전문성 항목을 찾을 수 없습니다.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateQualiItemDto,
  ) {
    return this.qualiItemDtoTsService.update(id, dto);
  }

  /**
   * 업무경험/전문성 항목 삭제
   */
  @Delete(':id')
  @ApiOperation({ summary: '업무경험/전문성 항목 삭제' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '업무경험/전문성 항목이 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '업무경험/전문성 항목을 찾을 수 없습니다.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.qualiItemDtoTsService.remove(id);
  }

  /**
   * 특정 임원의 모든 업무경험/전문성 항목 삭제
   */
  @Delete('executive/:executiveId')
  @ApiOperation({ summary: '특정 임원의 모든 업무경험/전문성 항목 삭제' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '해당 임원의 모든 업무경험/전문성 항목이 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  removeByExecutiveId(@Param('executiveId', ParseUUIDPipe) executiveId: string) {
    return this.qualiItemDtoTsService.removeByExecutiveId(executiveId);
  }
}
