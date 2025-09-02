import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateDutyDto } from './dto/create-duty.dto';
import { UpdateDutyDto } from './dto/update-duty.dto';
import { DutyResponseDto } from './dto/response-duty.dto';

@Injectable()
export class ResponsibilitiesService {
  constructor() {}

  // 책무 생성
  async create(createDutyDto: CreateDutyDto): Promise<DutyResponseDto> {
    // 임시 더미 데이터 반환
    return {
      id: 'temp-id-' + Date.now(),
      code: createDutyDto.code,
      name: createDutyDto.name,
      categoryId: createDutyDto.categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: createDutyDto.categoryId,
        name: '임시 카테고리',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      details: createDutyDto.details ? createDutyDto.details.map(detail => ({
        id: 'temp-detail-id-' + Date.now(),
        code: detail.code,
        content: detail.content,
        dutyId: 'temp-id-' + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })) : [],
    };
  }

  // 책무 목록 조회 (간단한 버전)
  async findAll() {
    // 임시 더미 데이터 반환
    return [
      {
        id: 'temp-1',
        code: 'D001',
        name: '임시 책무 1',
        categoryId: 'cat-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        category: {
          id: 'cat-1',
          name: '임시 카테고리 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        details: [],
      },
      {
        id: 'temp-2',
        code: 'D002',
        name: '임시 책무 2',
        categoryId: 'cat-2',
        createdAt: new Date(),
        updatedAt: new Date(),
        category: {
          id: 'cat-2',
          name: '임시 카테고리 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        details: [],
      },
    ];
  }

  // 책무 상세 조회
  async findOne(id: string): Promise<DutyResponseDto> {
    // 임시 더미 데이터 반환
    return {
      id: id,
      code: 'D001',
      name: '임시 책무',
      categoryId: 'cat-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: 'cat-1',
        name: '임시 카테고리',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      details: [],
    };
  }

  // 책무 수정
  async update(id: string, updateDutyDto: UpdateDutyDto): Promise<DutyResponseDto> {
    // 임시 더미 데이터 반환
    return {
      id: id,
      code: updateDutyDto.code || 'D001',
      name: updateDutyDto.name || '임시 책무',
      categoryId: updateDutyDto.categoryId || 'cat-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: updateDutyDto.categoryId || 'cat-1',
        name: '임시 카테고리',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      details: [],
    };
  }

  // 책무 삭제
  async remove(id: string): Promise<void> {
    // 임시로 아무것도 하지 않음
    console.log(`책무 ${id} 삭제 요청됨`);
  }

  // 책무구분 목록 조회
  async getCategories() {
    // 임시 더미 데이터 반환
    return [
      {
        id: 'cat-1',
        name: '임시 카테고리 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cat-2',
        name: '임시 카테고리 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
