import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQualiItemDto } from './dto/create-quali-item.dto';
import { UpdateQualiItemDto } from './dto/update-quali-item.dto';

@Injectable()
export class QualiItemDtoTsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 업무경험/전문성 항목 생성
   */
  async create(dto: CreateQualiItemDto) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: dto.executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    // 날짜 문자열을 Date 객체로 변환
    const qualiItemData = {
      ...dto,
      periodStart: dto.periodStart ? new Date(dto.periodStart) : null,
      periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : null,
      occurredAt: dto.occurredAt ? new Date(dto.occurredAt) : null,
    };

    return this.prisma.executiveQualiItem.create({
      data: qualiItemData,
      include: {
        executive: {
          select: {
            id: true,
            name: true,
            positionLabel: true,
            titleLabel: true
          }
        }
      }
    });
  }

  /**
   * 업무경험/전문성 항목 단건 조회
   */
  async findOne(id: string) {
    const qualiItem = await this.prisma.executiveQualiItem.findUnique({
      where: { id },
      include: {
        executive: {
          select: {
            id: true,
            name: true,
            positionLabel: true,
            titleLabel: true
          }
        }
      }
    });

    if (!qualiItem) {
      throw new NotFoundException('업무경험/전문성 항목을 찾을 수 없습니다.');
    }

    return qualiItem;
  }

  /**
   * 모든 업무경험/전문성 항목 조회
   */
  async findAll() {
    return this.prisma.executiveQualiItem.findMany({
      include: {
        executive: {
          select: {
            id: true,
            name: true,
            positionLabel: true,
            titleLabel: true
          }
        }
      },
      orderBy: [
        { executive: { name: 'asc' } },
        { type: 'asc' }
      ]
    });
  }

  /**
   * 특정 임원의 업무경험/전문성 항목 조회
   */
  async findByExecutiveId(executiveId: string) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    return this.prisma.executiveQualiItem.findMany({
      where: { executiveId },
      include: {
        executive: {
          select: {
            id: true,
            name: true,
            positionLabel: true,
            titleLabel: true
          }
        }
      },
      orderBy: { type: 'asc' }
    });
  }

  /**
   * 유형별 업무경험/전문성 항목 조회
   */
  async findByType(type: string) {
    return this.prisma.executiveQualiItem.findMany({
      where: { type: type as any },
      include: {
        executive: {
          select: {
            id: true,
            name: true,
            positionLabel: true,
            titleLabel: true
          }
        }
      },
      orderBy: { executive: { name: 'asc' } }
    });
  }

  /**
   * 업무경험/전문성 항목 수정
   */
  async update(id: string, dto: UpdateQualiItemDto) {
    // 업무경험/전문성 항목 존재 여부 확인
    await this.findOne(id);

    // executiveId가 변경되는 경우, 새로운 임원 존재 여부 확인
    if (dto.executiveId) {
      const executive = await this.prisma.executive.findUnique({
        where: { id: dto.executiveId }
      });

      if (!executive) {
        throw new NotFoundException('임원을 찾을 수 없습니다.');
      }
    }

    // 날짜 문자열을 Date 객체로 변환
    const updateData = {
      ...dto,
      periodStart: dto.periodStart ? new Date(dto.periodStart) : undefined,
      periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : undefined,
      occurredAt: dto.occurredAt ? new Date(dto.occurredAt) : undefined,
    };

    return this.prisma.executiveQualiItem.update({
      where: { id },
      data: updateData,
      include: {
        executive: {
          select: {
            id: true,
            name: true,
            positionLabel: true,
            titleLabel: true
          }
        }
      }
    });
  }

  /**
   * 업무경험/전문성 항목 삭제
   */
  async remove(id: string) {
    // 업무경험/전문성 항목 존재 여부 확인
    await this.findOne(id);

    return this.prisma.executiveQualiItem.delete({
      where: { id }
    });
  }

  /**
   * 특정 임원의 모든 업무경험/전문성 항목 삭제
   */
  async removeByExecutiveId(executiveId: string) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    return this.prisma.executiveQualiItem.deleteMany({
      where: { executiveId }
    });
  }
}
