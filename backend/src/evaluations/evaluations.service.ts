import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { PatchEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EvaluationsService {
  constructor() {}

  /**
   * 한 임원(executiveId)당 1개 평가. 이미 있으면 에러 대신 반환하는 버전.
   * 필요에 따라 upsert로 바꿔도 됨.
   */
  async createForExecutive(executiveId: string, dto: CreateEvaluationDto) {
    // 임시 더미 데이터 반환
    return {
      id: 'temp-eval-id-' + Date.now(),
      executiveId,
      evaluationResult: dto.evaluationResult ?? null,
      decisionReason: dto.decisionReason ?? null,
      status: dto.status ?? 'NOT_STARTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async findOne(id: string) {
    // 임시 더미 데이터 반환
    return {
      id: id,
      executiveId: 'temp-exec-id',
      evaluationResult: 'PASS',
      decisionReason: '임시 평가 결과',
      status: 'COMPLETED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async findByExecutiveId(executiveId: string) {
    // 임시 더미 데이터 반환
    return {
      id: 'temp-eval-id',
      executiveId: executiveId,
      evaluationResult: 'PASS',
      decisionReason: '임시 평가 결과',
      status: 'COMPLETED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async update(id: string, dto: PatchEvaluationDto) {
    // 임시 더미 데이터 반환
    return {
      id: id,
      executiveId: 'temp-exec-id',
      evaluationResult: dto.evaluationResult || 'PASS',
      decisionReason: dto.decisionReason || '임시 평가 결과',
      status: dto.status || 'COMPLETED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /** 임시저장 = 진행중 표시 */
  async saveDraft(id: string, dto: PatchEvaluationDto) {
    // 임시 더미 데이터 반환
    return {
      id: id,
      executiveId: 'temp-exec-id',
      evaluationResult: dto.evaluationResult || 'PASS',
      decisionReason: dto.decisionReason || '임시 평가 결과',
      status: 'IN_PROGRESS',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async remove(id: string) {
    // 임시로 아무것도 하지 않음
    console.log(`평가 ${id} 삭제 요청됨`);
    return { id };
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