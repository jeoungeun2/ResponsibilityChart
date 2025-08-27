import { Injectable, NotFoundException, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExecutiveDto } from './dto/create-executive.dto';
import { UpdateExecutiveDto } from './dto/update-executive.dto';
import { SearchExecutiveDto } from './dto/search-executive.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExecutivesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 임원 생성
   */
  async create(dto: CreateExecutiveDto) {
    try {
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

      return await this.prisma.executive.create({
        data: executiveData,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`데이터베이스 생성 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new InternalServerErrorException('임원 생성 중 예상치 못한 오류가 발생했습니다.');
    }
  }

  /**
   * 임원 단건 조회 (상세 정보 포함)
   */
  async findOne(id: string) {
    try {
      const executive = await this.prisma.executive.findUnique({
        where: { id },
        include: {
          // 조직 등록 정보 (1:1 관계)
          orgReg: true,
          // 자격/경험 항목들 (1:N 관계)
          qualiItems: {
            orderBy: [
              { type: 'asc' },
              { periodStart: 'desc' }
            ]
          },
          // 정직성/신뢰성 항목들 (1:N 관계)
          integrity: {
            orderBy: { category: 'asc' }
          },
          // 평가 정보 (1:1 관계)
          evaluation: true,
        },
      });

      if (!executive) {
        throw new NotFoundException('임원을 찾을 수 없습니다.');
      }

      return executive;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`데이터베이스 조회 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new InternalServerErrorException('임원 조회 중 예상치 못한 오류가 발생했습니다.');
    }
  }

  /**
   * 모든 임원 조회 (상세 정보 포함) - 전체 테이블 보기용
   */
  async findAll() {
    try {
      return await this.prisma.executive.findMany({
        include: {
          // 조직 등록 정보 (1:1 관계)
          orgReg: true,
          // 자격/경험 항목들 (1:N 관계)
          qualiItems: {
            orderBy: [
              { type: 'asc' },
              { periodStart: 'desc' }
            ]
          },
          // 정직성/신뢰성 항목들 (1:N 관계)
          integrity: {
            orderBy: { category: 'asc' }
          },
          // 평가 정보 (1:1 관계)
          evaluation: true,
        },
        orderBy: [
          { name: 'asc' },
          { createdAt: 'desc' }
        ],
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`데이터베이스 조회 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new InternalServerErrorException('임원 목록 조회 중 예상치 못한 오류가 발생했습니다.');
    }
  }

  /**
   * 임원 검색 (offset 기반 페이지네이션, 필터링, 정렬 지원)
   * - 검색 페이지용 (최소한의 조인)
   */
  async search(q: SearchExecutiveDto) {
    try {
      // 기본값 설정 및 유효성 검사
      const page = Math.max(1, q.page || 1);
      const take = Math.min(100, Math.max(1, q.take || 10));
      const sortBy = q.sortBy || 'createdAt';
      const order = q.order || 'desc';
      
      const skip = (page - 1) * take;

      // 검색 조건 구성
      const where: Prisma.ExecutiveWhereInput = {};
      
      // 키워드 검색 (이름 또는 이메일)
      if (q.keyword && q.keyword.trim()) {
        where.OR = [
          { name: { contains: q.keyword.trim(), mode: 'insensitive' } },
          { email: { contains: q.keyword.trim(), mode: 'insensitive' } },
        ];
      }
      
      // 날짜 범위 필터
      if (q.startDate || q.endDate) {
        where.createdAt = {};
        if (q.startDate) {
          where.createdAt.gte = q.startDate;
        }
        if (q.endDate) {
          where.createdAt.lte = q.endDate;
        }
      }

      // 연관 테이블 필터링
      if (q.evaluationStatus) {
        where.evaluation = {
          status: q.evaluationStatus as any
        };
      }

      if (q.qualiItemType) {
        where.qualiItems = {
          some: {
            type: q.qualiItemType as any
          }
        };
      }

      if (q.integrityCategory) {
        where.integrity = {
          some: {
            category: q.integrityCategory as any
          }
        };
      }

      // 전체 개수 조회 (필터링된 결과의 총 개수)
      const total = await this.prisma.executive.count({ where });

      // 데이터 조회 (검색용 - 최소한의 조인)
      const executives = await this.prisma.executive.findMany({
        where,
        skip,
        take,
        orderBy: [
          { [sortBy]: order },
          { id: order === 'desc' ? 'desc' : 'asc' } // 안정적 정렬을 위한 복합 키
        ],
        select: {
          id: true,
          name: true,
          employeeNo: true,
          positionLabel: true,
          titleLabel: true,
          phone: true,
          email: true,
          termStartDate: true,
          termEndDate: true,
          createdAt: true,
          updatedAt: true,
          // 평가 상태만 간단히 조회
          evaluation: {
            select: {
              status: true
            }
          }
        },
      });

      // 페이지네이션 메타데이터 계산
      const totalPages = Math.ceil(total / take);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return {
        data: executives,
        meta: {
          total,
          page,
          take,
          totalPages,
          hasNext,
          hasPrev,
          sortBy,
          order,
        },
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`데이터베이스 조회 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new InternalServerErrorException('임원 검색 중 예상치 못한 오류가 발생했습니다.');
    }
  }

  /**
   * 이름으로 임원 검색 (상세 정보 포함)
   */
  async findByName(name: string) {
    try {
      return await this.prisma.executive.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive', // 대소문자 구분 없음
          },
        },
        include: {
          // 조직 등록 정보 (1:1 관계)
          orgReg: true,
          // 자격/경험 항목들 (1:N 관계)
          qualiItems: {
            orderBy: [
              { type: 'asc' },
              { periodStart: 'desc' }
            ]
          },
          // 정직성/신뢰성 항목들 (1:N 관계)
          integrity: {
            orderBy: { category: 'asc' }
          },
          // 평가 정보 (1:1 관계)
          evaluation: true,
        },
        orderBy: [
          { name: 'asc' },
          { createdAt: 'desc' }
        ],
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`데이터베이스 조회 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new InternalServerErrorException('이름으로 임원 검색 중 예상치 못한 오류가 발생했습니다.');
    }
  }

  /**
   * 임원 수정
   */
  async update(id: string, dto: UpdateExecutiveDto) {
    try {
      // 임원 존재 여부 확인
      await this.findOne(id);

      // 날짜 문자열을 Date 객체로 변환
      const updateData = {
        ...dto,
        termStartDate: dto.termStartDate ? new Date(dto.termStartDate) : undefined,
        termEndDate: dto.termEndDate ? new Date(dto.termEndDate) : undefined,
      };

      return await this.prisma.executive.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`데이터베이스 수정 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new InternalServerErrorException('임원 수정 중 예상치 못한 오류가 발생했습니다.');
    }
  }

  /**
   * 임원 삭제
   */
  async remove(id: string) {
    try {
      // 임원 존재 여부 확인
      await this.findOne(id);

      return await this.prisma.executive.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(`데이터베이스 삭제 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new InternalServerErrorException('임원 삭제 중 예상치 못한 오류가 발생했습니다.');
    }
  }
}
