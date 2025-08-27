import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { PatchEvaluationDto } from './dto/update-evaluation.dto';
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

@ApiTags('evaluations')
@ApiBearerAuth('access-token')        // Swagger에 Authorize 버튼 추가
@UseGuards(AccessTokenGuard)          // JWT 인증 필수
@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  /**
   * 특정 임원(executiveId)에 대한 평가 생성
   * (임원 1명당 1개만 생성 가능, 이미 있으면 409)
   */
  @Post('executive/:executiveId')
  @ApiOperation({ summary: '임원 평가 생성' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiBody({ type: CreateEvaluationDto })
  @ApiCreatedResponse({ description: '평가가 생성되었습니다.' })
  @ApiConflictResponse({ description: '이미 평가가 존재합니다.' })
  createForExecutive(
    @Param('executiveId', ParseUUIDPipe) executiveId: string,
    @Body() dto: CreateEvaluationDto,
  ) {
    return this.evaluationsService.createForExecutive(executiveId, dto);
  }

  /**
   * 평가 단건 조회 (id 기준)
   */
  @Get(':id')
  @ApiOperation({ summary: '평가 단건 조회' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '평가 단건 반환' })
  @ApiNotFoundResponse({ description: '평가를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.evaluationsService.findOne(id);
  }

  /**
   * 특정 임원의 평가 조회 (executiveId 기준)
   */
  @Get('executive/:executiveId')
  @ApiOperation({ summary: '임원 평가 조회' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '해당 임원의 평가 반환' })
  @ApiNotFoundResponse({ description: '해당 임원의 평가가 없습니다.' })
  findByExecutiveId(@Param('executiveId', ParseUUIDPipe) executiveId: string) {
    return this.evaluationsService.findByExecutiveId(executiveId);
  }

  /**
   * 평가 수정 (일반 업데이트)
   */
  @Patch(':id')
  @ApiOperation({ summary: '평가 수정' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: PatchEvaluationDto })
  @ApiOkResponse({ description: '평가가 수정되었습니다.' })
  @ApiNotFoundResponse({ description: '평가를 찾을 수 없습니다.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: PatchEvaluationDto,
  ) {
    return this.evaluationsService.update(id, dto);
  }

  /**
   * 평가 임시저장 (진행중 상태로 저장)
   */
  @Put(':id/draft')
  @ApiOperation({ summary: '평가 임시저장', description: 'IN_PROGRESS 상태로 저장' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: PatchEvaluationDto })
  @ApiOkResponse({ description: '임시저장 완료' })
  @ApiNotFoundResponse({ description: '평가를 찾을 수 없습니다.' })
  saveDraft(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: PatchEvaluationDto,
  ) {
    return this.evaluationsService.saveDraft(id, dto);
  }

  /**
   * 평가 삭제
   */
  @Delete(':id')
  @ApiOperation({ summary: '평가 삭제' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '평가가 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '평가를 찾을 수 없습니다.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.evaluationsService.remove(id);
  }
}