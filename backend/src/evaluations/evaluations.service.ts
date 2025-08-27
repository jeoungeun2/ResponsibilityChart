import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EvaluationStatus } from '@prisma/client';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { PatchEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EvaluationsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 한 임원(executiveId)당 1개 평가. 이미 있으면 에러 대신 반환하는 버전.
   * 필요에 따라 upsert로 바꿔도 됨.
   */
  async createForExecutive(executiveId: string, dto: CreateEvaluationDto) {
    const existing = await this.prisma.executiveEvaluation.findUnique({
      where: { executiveId },
    });

    if (existing) {
      throw new ConflictException('이미 평가가 존재합니다.');
    }

    return this.prisma.executiveEvaluation.create({
      data: {
        executiveId,
        evaluationResult: dto.evaluationResult ?? null,
        decisionReason: dto.decisionReason ?? null,
        status: dto.status ?? EvaluationStatus.NOT_STARTED,
      },
    });
  }

  async findOne(id: string) {
    const evalRow = await this.prisma.executiveEvaluation.findUnique({ where: { id } });
    if (!evalRow) throw new NotFoundException('평가를 찾을 수 없습니다.');
    return evalRow;
  }

  async findByExecutiveId(executiveId: string) {
    const evalRow = await this.prisma.executiveEvaluation.findUnique({ where: { executiveId } });
    if (!evalRow) throw new NotFoundException('해당 임원의 평가가 없습니다.');
    return evalRow;
  }

  async update(id: string, dto: PatchEvaluationDto) {
    const existing = await this.findOne(id);

    return this.prisma.executiveEvaluation.update({
      where: { id },
      data: {
        evaluationResult: dto.evaluationResult,
        decisionReason: dto.decisionReason,
        status: dto.status,
      },
    });
  }

  /** 임시저장 = 진행중 표시 */
  async saveDraft(id: string, dto: PatchEvaluationDto) {
    await this.findOne(id);
    return this.prisma.executiveEvaluation.update({
      where: { id },
      data: {
        evaluationResult: dto.evaluationResult,
        decisionReason: dto.decisionReason,
        status: EvaluationStatus.IN_PROGRESS,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // 없으면 NotFoundException
    return this.prisma.executiveEvaluation.delete({ where: { id } });
  }

  // /** 필요 시: upsert 버전 (존재하면 갱신/없으면 생성) */
  // async upsertForExecutive(executiveId: string, dto: PatchEvaluationDto | CreateEvaluationDto) {
  //   return this.prisma.executiveEvaluation.upsert({
  //     where: { executiveId },
  //     update: {
  //       evaluationResult: dto.evaluationResult,
  //       decisionReason: dto.decisionReason,
  //       status: (dto as PatchEvaluationDto).status,
  //     },
  //     create: {
  //       executiveId,
  //       evaluationResult: dto.evaluationResult ?? null,
  //       decisionReason: dto.decisionReason ?? null,
  //       status: (dto as CreateEvaluationDto).status ?? EvaluationStatus.NOT_STARTED,
  //     },
  //   });
  // }
}