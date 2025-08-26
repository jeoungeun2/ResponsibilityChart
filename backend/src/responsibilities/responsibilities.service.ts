import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDutyDto } from './dto/create-duty.dto';
import { UpdateDutyDto } from './dto/update-duty.dto';
import { DutyResponseDto } from './dto/response-duty.dto';

@Injectable()
export class ResponsibilitiesService {
  constructor(private prisma: PrismaService) {}

  // 책무 생성
  async create(createDutyDto: CreateDutyDto): Promise<DutyResponseDto> {
    // 책무코드 중복 확인
    const existingDuty = await this.prisma.duty.findUnique({
      where: { code: createDutyDto.code },
    });

    if (existingDuty) {
      throw new BadRequestException('이미 존재하는 책무코드입니다.');
    }

    // 카테고리 존재 확인
    const category = await this.prisma.dutyCategory.findUnique({
      where: { id: createDutyDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('존재하지 않는 책무구분입니다.');
    }

    // 책무와 세부내용 함께 생성
    const duty = await this.prisma.duty.create({
      data: {
        code: createDutyDto.code,
        name: createDutyDto.name,
        categoryId: createDutyDto.categoryId,
        details: createDutyDto.details ? {
          create: createDutyDto.details.map(detail => ({
            code: detail.code,
            content: detail.content,
          })),
        } : undefined,
      },
      include: {
        category: true,
        details: true,
      },
    });

    return duty;
  }

  // 책무 목록 조회 (간단한 버전)
  async findAll() {
    return await this.prisma.duty.findMany({
      include: {
        category: true,
        details: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 책무 상세 조회
  async findOne(id: string): Promise<DutyResponseDto> {
    const duty = await this.prisma.duty.findUnique({
      where: { id },
      include: {
        category: true,
        details: true,
      },
    });

    if (!duty) {
      throw new NotFoundException('존재하지 않는 책무입니다.');
    }

    return duty;
  }

  // 책무 수정
  async update(id: string, updateDutyDto: UpdateDutyDto): Promise<DutyResponseDto> {
    // 책무 존재 확인
    const existingDuty = await this.prisma.duty.findUnique({
      where: { id },
    });

    if (!existingDuty) {
      throw new NotFoundException('존재하지 않는 책무입니다.');
    }

    // 책무코드 중복 확인 (자신 제외)
    if (updateDutyDto.code && updateDutyDto.code !== existingDuty.code) {
      const duplicateCode = await this.prisma.duty.findUnique({
        where: { code: updateDutyDto.code },
      });

      if (duplicateCode) {
        throw new BadRequestException('이미 존재하는 책무코드입니다.');
      }
    }

    // 카테고리 존재 확인
    if (updateDutyDto.categoryId) {
      const category = await this.prisma.dutyCategory.findUnique({
        where: { id: updateDutyDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('존재하지 않는 책무구분입니다.');
      }
    }

    // 책무 수정
    const updatedDuty = await this.prisma.duty.update({
      where: { id },
      data: {
        code: updateDutyDto.code,
        name: updateDutyDto.name,
        categoryId: updateDutyDto.categoryId,
      },
      include: {
        category: true,
        details: true,
      },
    });

    return updatedDuty;
  }

  // 책무 삭제
  async remove(id: string): Promise<void> {
    const duty = await this.prisma.duty.findUnique({
      where: { id },
    });

    if (!duty) {
      throw new NotFoundException('존재하지 않는 책무입니다.');
    }

    // 책무와 관련된 세부내용도 함께 삭제 (Cascade)
    await this.prisma.duty.delete({
      where: { id },
    });
  }

  // 책무구분 목록 조회
  async getCategories() {
    return await this.prisma.dutyCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
