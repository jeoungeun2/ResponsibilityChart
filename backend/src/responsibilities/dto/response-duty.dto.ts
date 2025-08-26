import { ApiProperty } from '@nestjs/swagger';

// 책무 세부 응답 DTO
export class DutyDetailResponseDto {
  @ApiProperty({ description: '세부내용 ID' })
  id: string;

  @ApiProperty({ description: '세부코드', example: 'AM-경영관리-C11-A' })
  code: string;

  @ApiProperty({ description: '세부내용', example: '경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임' })
  content: string;

  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @ApiProperty({ description: '수정일시' })
  updatedAt: Date;
}

// 책무 응답 DTO
export class DutyResponseDto {
  @ApiProperty({ description: '책무 ID' })
  id: string;

  @ApiProperty({ description: '책무코드', example: 'AM-경영관리-C11' })
  code: string;

  @ApiProperty({ description: '책무명', example: '경영지원업무와 관련된 책무' })
  name: string;

  @ApiProperty({ description: '책무구분 ID' })
  categoryId: string;

  @ApiProperty({ description: '책무구분 정보' })
  category: {
    id: string;
    name: string;
  };

  @ApiProperty({ description: '책무 세부내용 목록', type: [DutyDetailResponseDto] })
  details: DutyDetailResponseDto[];

  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @ApiProperty({ description: '수정일시' })
  updatedAt: Date;
}

// 책무 목록 응답 DTO
export class DutyListResponseDto {
  @ApiProperty({ description: '책무 목록', type: [DutyResponseDto] })
  duties: DutyResponseDto[];

  @ApiProperty({ description: '전체 개수' })
  total: number;

  @ApiProperty({ description: '현재 페이지' })
  page: number;

  @ApiProperty({ description: '페이지당 개수' })
  limit: number;

  @ApiProperty({ description: '전체 페이지 수' })
  totalPages: number;
}
