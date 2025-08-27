// 책무(Responsibilities) 도메인 관련 API 함수들
import { 
  responsibilitiesControllerFindAll,
  responsibilitiesControllerCreate,
  responsibilitiesControllerRemove,
  responsibilitiesControllerFindOne,
  responsibilitiesControllerUpdate,
  responsibilitiesControllerGetCategories,
  type Options 
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 기본 client를 사용하는 래핑된 함수들
export const responsibilitiesApi = {
  // 모든 책무 목록 조회
  findAll: (options?: Omit<Options, 'client'>) => 
    responsibilitiesControllerFindAll({ ...options, client }),
  
  // 새로운 책무 생성
  create: (options: Omit<Options, 'client'>) => 
    responsibilitiesControllerCreate({ ...options, client }),
  
  // 책무 삭제
  remove: (options: Omit<Options, 'client'>) => 
    responsibilitiesControllerRemove({ ...options, client }),
  
  // 책무 단건 조회
  findOne: (options: Omit<Options, 'client'>) => 
    responsibilitiesControllerFindOne({ ...options, client }),
  
  // 책무 수정
  update: (options: Omit<Options, 'client'>) => 
    responsibilitiesControllerUpdate({ ...options, client }),
  
  // 책무 카테고리 목록 조회
  getCategories: (options?: Omit<Options, 'client'>) => 
    responsibilitiesControllerGetCategories({ ...options, client }),
};
