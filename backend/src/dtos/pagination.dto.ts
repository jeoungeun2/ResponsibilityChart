import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsIn, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  take?: number = 10; // 최대값 제한은 서비스에서 cap
}

export class SortDto<TAllowed extends string = string> {
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  // 허용 컬럼만 받도록 컨트롤러에서 제네릭을 좁히거나 별도 유효성 로직 추가
  sortBy?: TAllowed;
}
