// 임원(Executives) 도메인 관련 API 함수들
import { 
  executivesControllerFindAll,
  executivesControllerCreate,
  executivesControllerRemove,
  executivesControllerFindOne,
  executivesControllerUpdate,
  executivesControllerFindByName,
  executivesControllerSearch,
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 검색 파라미터 타입 정의 (DTO와 일치, schema.prisma 기반)
type SearchParams = {
  page?: number;
  take?: number;
  keyword?: string;
  sortBy?: 'name' | 'createdAt' | 'email' | 'positionLabel';
  order?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
  evaluationStatus?: 'NOT_STARTED' | 'STARTED' | 'IN_PROGRESS';
  qualiItemType?: 'WORK' | 'EDUCATION' | 'AWARD' | 'CERT' | 'OTHER';
  integrityCategory?: 'DISCIPLINARY_LOOKUP' | 'CRIMINAL_RECORD_LOOKUP' | 'DISQUALIFICATION_LOOKUP' | 'LAW_TRAINING_ISSUE' | 'OTHER';
};

// 기본 client를 사용하는 래핑된 함수들
export const executivesApi = {
  // 모든 임원 목록 조회 (전체 테이블 보기용)
  findAll: () => 
    executivesControllerFindAll({ client }),
  
  // 새로운 임원 생성
  create: (data: { body: any }) => 
    executivesControllerCreate({ client, body: data.body }),
  
  // 임원 삭제
  remove: (data: { path: { id: string } }) => 
    executivesControllerRemove({ client, path: data.path }),
  
  // 임원 단건 조회
  findOne: (data: { path: { id: string } }) => 
    executivesControllerFindOne({ client, path: data.path }),
  
  // 임원 정보 수정
  update: (data: { path: { id: string }; body: any }) => 
    executivesControllerUpdate({ client, path: data.path, body: data.body }),
  
  // 이름으로 임원 검색
  findByName: (data: { path: { name: string } }) => 
    executivesControllerFindByName({ client, path: data.path }),

  // 임원 검색 (offset 기반 페이지네이션, 필터링, 정렬 지원)
  search: (params: SearchParams) => 
    executivesControllerSearch({ 
      client, 
      query: params 
    }),
};
