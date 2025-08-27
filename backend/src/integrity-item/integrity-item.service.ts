import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIntegrityItemDto } from './dto/create-integrity-item.dto';
import { UpdateIntegrityItemDto } from './dto/update-integrity-item.dto';

@Injectable()
export class IntegrityItemService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 정직성 항목 생성
   */
  async create(dto: CreateIntegrityItemDto) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: dto.executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    // 동일한 임원의 동일한 카테고리 항목이 이미 존재하는지 확인
    const existingItem = await this.prisma.executiveIntegrityItem.findFirst({
      where: {
        executiveId: dto.executiveId,
        category: dto.category
      }
    });

    if (existingItem) {
      throw new ConflictException('해당 임원의 동일한 카테고리 항목이 이미 존재합니다.');
    }

    return this.prisma.executiveIntegrityItem.create({
      data: dto,
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
   * 정직성 항목 단건 조회
   */
  async findOne(id: string) {
    const integrityItem = await this.prisma.executiveIntegrityItem.findUnique({
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

    if (!integrityItem) {
      throw new NotFoundException('정직성 항목을 찾을 수 없습니다.');
    }

    return integrityItem;
  }

  /**
   * 모든 정직성 항목 조회
   */
  async findAll() {
    return this.prisma.executiveIntegrityItem.findMany({
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
        { category: 'asc' }
      ]
    });
  }

  /**
   * 특정 임원의 정직성 항목 조회
   */
  async findByExecutiveId(executiveId: string) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    return this.prisma.executiveIntegrityItem.findMany({
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
      orderBy: { category: 'asc' }
    });
  }

  /**
   * 카테고리별 정직성 항목 조회
   */
  async findByCategory(category: string) {
    return this.prisma.executiveIntegrityItem.findMany({
      where: { category: category as any },
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
   * 정직성 항목 수정
   */
  async update(id: string, dto: UpdateIntegrityItemDto) {
    // 정직성 항목 존재 여부 확인
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

    // 카테고리가 변경되는 경우, 동일한 임원의 동일한 카테고리 항목이 이미 존재하는지 확인
    if (dto.category) {
      const currentItem = await this.prisma.executiveIntegrityItem.findUnique({
        where: { id }
      });

      if (!currentItem) {
        throw new NotFoundException('정직성 항목을 찾을 수 없습니다.');
      }

      const existingItem = await this.prisma.executiveIntegrityItem.findFirst({
        where: {
          executiveId: dto.executiveId || currentItem.executiveId,
          category: dto.category,
          id: { not: id } // 현재 항목 제외
        }
      });

      if (existingItem) {
        throw new ConflictException('해당 임원의 동일한 카테고리 항목이 이미 존재합니다.');
      }
    }

    return this.prisma.executiveIntegrityItem.update({
      where: { id },
      data: dto,
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
   * 정직성 항목 삭제
   */
  async remove(id: string) {
    // 정직성 항목 존재 여부 확인
    await this.findOne(id);

    return this.prisma.executiveIntegrityItem.delete({
      where: { id }
    });
  }

  /**
   * 특정 임원의 모든 정직성 항목 삭제
   */
  async removeByExecutiveId(executiveId: string) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    return this.prisma.executiveIntegrityItem.deleteMany({
      where: { executiveId }
    });
  }
}
