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
import { ExecutivesService } from './executives.service';
import { CreateExecutiveDto } from './dto/create-executive.dto';
import { UpdateExecutiveDto } from './dto/update-executive.dto';
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

@ApiTags('executives')
@ApiBearerAuth('access-token')        // Swagger에 Authorize 버튼 추가
@UseGuards(AccessTokenGuard)          // JWT 인증 필수
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
   * 모든 임원 조회
   */
  @Get()
  @ApiOperation({ summary: '모든 임원 조회' })
  @ApiOkResponse({ description: '모든 임원 목록 반환' })
  findAll() {
    return this.executivesService.findAll();
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
  @ApiOkResponse({ description: '임원이 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.executivesService.remove(id);
  }
}
