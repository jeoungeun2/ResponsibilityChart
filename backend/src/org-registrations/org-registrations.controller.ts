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
import { OrgRegistrationsService } from './org-registrations.service';
import { CreateOrgRegistrationDto } from './dto/create-org-registration.dto';
import { UpdateOrgRegistrationDto } from './dto/update-org-registration.dto';
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

@ApiTags('org-registrations')
@ApiBearerAuth('access-token')        // Swagger에 Authorize 버튼 추가
@UseGuards(AccessTokenGuard)          // JWT 인증 필수
@Controller('org-registrations')
export class OrgRegistrationsController {
  constructor(private readonly orgRegistrationsService: OrgRegistrationsService) {}

  /**
   * 조직등록 생성
   */
  @Post()
  @ApiOperation({ summary: '조직등록 생성' })
  @ApiBody({ type: CreateOrgRegistrationDto })
  @ApiCreatedResponse({ description: '조직등록이 생성되었습니다.' })
  @ApiConflictResponse({ description: '해당 임원의 조직등록이 이미 존재합니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  create(@Body() dto: CreateOrgRegistrationDto) {
    return this.orgRegistrationsService.create(dto);
  }

  /**
   * 조직등록 단건 조회 (id 기준)
   */
  @Get(':id')
  @ApiOperation({ summary: '조직등록 단건 조회' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '조직등록 단건 반환' })
  @ApiNotFoundResponse({ description: '조직등록을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orgRegistrationsService.findOne(id);
  }

  /**
   * 모든 조직등록 조회
   */
  @Get()
  @ApiOperation({ summary: '모든 조직등록 조회' })
  @ApiOkResponse({ description: '모든 조직등록 목록 반환' })
  findAll() {
    return this.orgRegistrationsService.findAll();
  }

  /**
   * 특정 임원의 조직등록 조회
   */
  @Get('executive/:executiveId')
  @ApiOperation({ summary: '특정 임원의 조직등록 조회' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '해당 임원의 조직등록 반환' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  findByExecutiveId(@Param('executiveId', ParseUUIDPipe) executiveId: string) {
    return this.orgRegistrationsService.findByExecutiveId(executiveId);
  }

  /**
   * 조직등록 수정
   */
  @Patch(':id')
  @ApiOperation({ summary: '조직등록 수정' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateOrgRegistrationDto })
  @ApiOkResponse({ description: '조직등록이 수정되었습니다.' })
  @ApiNotFoundResponse({ description: '조직등록을 찾을 수 없습니다.' })
  @ApiConflictResponse({ description: '해당 임원의 조직등록이 이미 존재합니다.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOrgRegistrationDto,
  ) {
    return this.orgRegistrationsService.update(id, dto);
  }

  /**
   * 조직등록 삭제
   */
  @Delete(':id')
  @ApiOperation({ summary: '조직등록 삭제' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '조직등록이 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '조직등록을 찾을 수 없습니다.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orgRegistrationsService.remove(id);
  }

  /**
   * 특정 임원의 조직등록 삭제
   */
  @Delete('executive/:executiveId')
  @ApiOperation({ summary: '특정 임원의 조직등록 삭제' })
  @ApiParam({ name: 'executiveId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: '해당 임원의 조직등록이 삭제되었습니다.' })
  @ApiNotFoundResponse({ description: '임원을 찾을 수 없습니다.' })
  removeByExecutiveId(@Param('executiveId', ParseUUIDPipe) executiveId: string) {
    return this.orgRegistrationsService.removeByExecutiveId(executiveId);
  }
}