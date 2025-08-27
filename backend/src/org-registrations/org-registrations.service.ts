import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrgRegistrationDto } from './dto/create-org-registration.dto';
import { UpdateOrgRegistrationDto } from './dto/update-org-registration.dto';

@Injectable()
export class OrgRegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 조직등록 생성
   */
  async create(dto: CreateOrgRegistrationDto) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: dto.executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    // 해당 임원의 조직등록이 이미 존재하는지 확인 (1:1 관계)
    const existingRegistration = await this.prisma.executiveOrgRegistration.findUnique({
      where: { executiveId: dto.executiveId }
    });

    if (existingRegistration) {
      throw new ConflictException('해당 임원의 조직등록이 이미 존재합니다.');
    }

    return this.prisma.executiveOrgRegistration.create({
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
   * 조직등록 단건 조회
   */
  async findOne(id: string) {
    const orgRegistration = await this.prisma.executiveOrgRegistration.findUnique({
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

    if (!orgRegistration) {
      throw new NotFoundException('조직등록을 찾을 수 없습니다.');
    }

    return orgRegistration;
  }

  /**
   * 모든 조직등록 조회
   */
  async findAll() {
    return this.prisma.executiveOrgRegistration.findMany({
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
   * 특정 임원의 조직등록 조회
   */
  async findByExecutiveId(executiveId: string) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    const orgRegistration = await this.prisma.executiveOrgRegistration.findUnique({
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
      }
    });

    if (!orgRegistration) {
      throw new NotFoundException('해당 임원의 조직등록이 없습니다.');
    }

    return orgRegistration;
  }

  /**
   * 조직등록 수정
   */
  async update(id: string, dto: UpdateOrgRegistrationDto) {
    // 조직등록 존재 여부 확인
    await this.findOne(id);

    // executiveId가 변경되는 경우, 새로운 임원 존재 여부 확인
    if (dto.executiveId) {
      const executive = await this.prisma.executive.findUnique({
        where: { id: dto.executiveId }
      });

      if (!executive) {
        throw new NotFoundException('임원을 찾을 수 없습니다.');
      }

      // 새로운 임원에게 이미 조직등록이 있는지 확인
      const existingRegistration = await this.prisma.executiveOrgRegistration.findUnique({
        where: { executiveId: dto.executiveId }
      });

      if (existingRegistration && existingRegistration.id !== id) {
        throw new ConflictException('해당 임원의 조직등록이 이미 존재합니다.');
      }
    }

    return this.prisma.executiveOrgRegistration.update({
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
   * 조직등록 삭제
   */
  async remove(id: string) {
    // 조직등록 존재 여부 확인
    await this.findOne(id);

    return this.prisma.executiveOrgRegistration.delete({
      where: { id }
    });
  }

  /**
   * 특정 임원의 조직등록 삭제
   */
  async removeByExecutiveId(executiveId: string) {
    // 임원 존재 여부 확인
    const executive = await this.prisma.executive.findUnique({
      where: { id: executiveId }
    });

    if (!executive) {
      throw new NotFoundException('임원을 찾을 수 없습니다.');
    }

    const orgRegistration = await this.prisma.executiveOrgRegistration.findUnique({
      where: { executiveId }
    });

    if (!orgRegistration) {
      throw new NotFoundException('해당 임원의 조직등록이 없습니다.');
    }

    return this.prisma.executiveOrgRegistration.delete({
      where: { executiveId }
    });
  }
}
