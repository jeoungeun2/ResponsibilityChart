import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsIn, IsInt, Min } from 'class-validator';

// 허용된 정렬 필드와 순서를 상수로 정의
export const ALLOWED_SORT_FIELDS = ['name', 'createdAt', 'email', 'positionLabel'] as const;
export const ALLOWED_SORT_ORDERS = ['asc', 'desc'] as const;

export type SortField = typeof ALLOWED_SORT_FIELDS[number];
export type SortOrder = typeof ALLOWED_SORT_ORDERS[number];

export class SearchExecutiveDto {
  // 페이지네이션
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  take?: number = 10;

  @IsOptional()
  @IsString()
  keyword?: string; // 이름/이메일 등 contains 검색

  // 정렬 필드 - 화이트리스트 검증
  @IsOptional()
  @IsIn(ALLOWED_SORT_FIELDS)
  sortBy?: SortField;

  // 정렬 순서 - 화이트리스트 검증
  @IsOptional()
  @IsIn(ALLOWED_SORT_ORDERS)
  order?: SortOrder;

  // 날짜 필터 - class-transformer와 class-validator 사용
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  // 연관 테이블 필터링 지원
  @IsOptional()
  @IsIn(['NOT_STARTED', 'STARTED', 'IN_PROGRESS'])
  evaluationStatus?: string;

  @IsOptional()
  @IsIn(['WORK', 'EDUCATION', 'AWARD', 'CERT', 'OTHER'])
  qualiItemType?: string;

  @IsOptional()
  @IsIn(['DISCIPLINARY_LOOKUP', 'CRIMINAL_RECORD_LOOKUP', 'DISQUALIFICATION_LOOKUP', 'LAW_TRAINING_ISSUE', 'OTHER'])
  integrityCategory?: string;
}
