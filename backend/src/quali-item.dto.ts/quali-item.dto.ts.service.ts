import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateQualiItemDto } from './dto/create-quali-item.dto';
import { UpdateQualiItemDto } from './dto/update-quali-item.dto';

@Injectable()
export class QualiItemDtoTsService {
  constructor() {}

  /**
   * 업무경험/전문성 항목 생성
   */
  async create(dto: CreateQualiItemDto) {
    // 임시 더미 데이터 반환
    return {
      id: 'temp-quali-id-' + Date.now(),
      ...dto,
      periodStart: dto.periodStart ? new Date(dto.periodStart) : null,
      periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : null,
      occurredAt: dto.occurredAt ? new Date(dto.occurredAt) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      executive: {
        id: dto.executiveId,
        name: '임시 임원',
        positionLabel: '임시 직책',
        titleLabel: '임시 직위'
      }
    };
  }

  /**
   * 업무경험/전문성 항목 단건 조회
   */
  async findOne(id: string) {
    // 임시 더미 데이터 반환
    return {
      id: id,
      executiveId: 'temp-exec-id',
      type: 'EXPERIENCE',
      title: '임시 업무경험',
      description: '임시 설명',
      periodStart: new Date(),
      periodEnd: new Date(),
      occurredAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      executive: {
        id: 'temp-exec-id',
        name: '임시 임원',
        positionLabel: '임시 직책',
        titleLabel: '임시 직위'
      }
    };
  }

  /**
   * 모든 업무경험/전문성 항목 조회
   */
  async findAll() {
    // 임시 더미 데이터 반환
    return [
      {
        id: 'temp-1',
        executiveId: 'temp-exec-1',
        type: 'EXPERIENCE',
        title: '임시 업무경험 1',
        description: '임시 설명 1',
        periodStart: new Date(),
        periodEnd: new Date(),
        occurredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        executive: {
          id: 'temp-exec-1',
          name: '임시 임원 1',
          positionLabel: '임시 직책 1',
          titleLabel: '임시 직위 1'
        }
      },
      {
        id: 'temp-2',
        executiveId: 'temp-exec-2',
        type: 'EXPERTISE',
        title: '임시 전문성 1',
        description: '임시 설명 2',
        periodStart: new Date(),
        periodEnd: new Date(),
        occurredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        executive: {
          id: 'temp-exec-2',
          name: '임시 임원 2',
          positionLabel: '임시 직책 2',
          titleLabel: '임시 직위 2'
        }
      }
    ];
  }

  /**
   * 특정 임원의 업무경험/전문성 항목 조회
   */
  async findByExecutiveId(executiveId: string) {
    // 임시 더미 데이터 반환
    return [
      {
        id: 'temp-quali-id',
        executiveId: executiveId,
        type: 'EXPERIENCE',
        title: '임시 업무경험',
        description: '임시 설명',
        periodStart: new Date(),
        periodEnd: new Date(),
        occurredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        executive: {
          id: executiveId,
          name: '임시 임원',
          positionLabel: '임시 직책',
          titleLabel: '임시 직위'
        }
      }
    ];
  }

  /**
   * 유형별 업무경험/전문성 항목 조회
   */
  async findByType(type: string) {
    // 임시 더미 데이터 반환
    return [
      {
        id: 'temp-quali-id',
        executiveId: 'temp-exec-id',
        type: type,
        title: '임시 항목',
        description: '임시 설명',
        periodStart: new Date(),
        periodEnd: new Date(),
        occurredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        executive: {
          id: 'temp-exec-id',
          name: '임시 임원',
          positionLabel: '임시 직책',
          titleLabel: '임시 직위'
        }
      }
    ];
  }

  /**
   * 업무경험/전문성 항목 수정
   */
  async update(id: string, dto: UpdateQualiItemDto) {
    // 임시 더미 데이터 반환
    return {
      id: id,
      executiveId: dto.executiveId || 'temp-exec-id',
      type: dto.type || 'EXPERIENCE',
      title: dto.title || '임시 항목',
      description: dto.description || '임시 설명',
      periodStart: dto.periodStart ? new Date(dto.periodStart) : new Date(),
      periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : new Date(),
      occurredAt: dto.occurredAt ? new Date(dto.occurredAt) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      executive: {
        id: dto.executiveId || 'temp-exec-id',
        name: '임시 임원',
        positionLabel: '임시 직책',
        titleLabel: '임시 직위'
      }
    };
  }

  /**
   * 업무경험/전문성 항목 삭제
   */
  async remove(id: string) {
    // 임시로 아무것도 하지 않음
    console.log(`업무경험/전문성 항목 ${id} 삭제 요청됨`);
    return { id };
  }

  /**
   * 특정 임원의 모든 업무경험/전문성 항목 삭제
   */
  async removeByExecutiveId(executiveId: string) {
    // 임시로 아무것도 하지 않음
    console.log(`임원 ${executiveId}의 모든 업무경험/전문성 항목 삭제 요청됨`);
    return { count: 1 };
  }
}
