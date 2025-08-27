import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExecutiveDto } from './dto/create-executive.dto';
import { UpdateExecutiveDto } from './dto/update-executive.dto';

@Injectable()
export class ExecutivesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 임원 생성
   */
  async create(dto: CreateExecutiveDto) {
    // 이름 중복 체크
    const existingExecutive = await this.prisma.executive.findFirst({
      where: { name: dto.name }
    });

    if (existingExecutive) {
      throw new ConflictException('이미 존재하는 임원입니다.');
    }

    // 날짜 문자열을 Date 객체로 변환
    const executiveData = {
      ...dto,
      termStartDate: dto.termStartDate ? new Date(dto.termStartDate) : null,
      termEndDate: dto.termEndDate ? new Date(dto.termEndDate) : null,
    };

    return this.prisma.executive.create({
      data: executiveData,
    });
  }

  /**
   * 임원 단건 조회
   */
  async findOne(id: string) {
    const executive = await this.prisma.executive.findUnique({
      where: { id },
      include: {
        orgReg: true,
        qualiItems: true,
        integrity: true,
        evaluation: true,
      },
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    return executive;
  }

  /**
   * 모든 임원 조회
   */
  async findAll() {
    return this.prisma.executive.findMany({
      include: {
        orgReg: true,
        qualiItems: true,
        integrity: true,
        evaluation: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * 이름으로 임원 검색
   */
  async findByName(name: string) {
    return this.prisma.executive.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive', // 대소문자 구분 없음
        },
      },
      include: {
        orgReg: true,
        qualiItems: true,
        integrity: true,
        evaluation: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * 임원 수정
   */
  async update(id: string, dto: UpdateExecutiveDto) {
    // 임원 존재 여부 확인
    await this.findOne(id);

    // 날짜 문자열을 Date 객체로 변환
    const updateData = {
      ...dto,
      termStartDate: dto.termStartDate ? new Date(dto.termStartDate) : undefined,
      termEndDate: dto.termEndDate ? new Date(dto.termEndDate) : undefined,
    };

    return this.prisma.executive.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * 임원 삭제
   */
  async remove(id: string) {
    // 임원 존재 여부 확인
    await this.findOne(id);

    return this.prisma.executive.delete({
      where: { id },
    });
  }
}
