// 임원(Executives) 도메인 관련 API 함수들
import { 
  executivesControllerFindAll,
  executivesControllerCreate,
  executivesControllerRemove,
  executivesControllerFindOne,
  executivesControllerUpdate,
  executivesControllerFindByName,
  type Options 
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 기본 client를 사용하는 래핑된 함수들
export const executivesApi = {
  // 모든 임원 목록 조회
  findAll: (options?: Omit<Options, 'client'>) => 
    executivesControllerFindAll({ ...options, client }),
  
  // 새로운 임원 생성
  create: (options: Omit<Options, 'client'>) => 
    executivesControllerCreate({ ...options, client }),
  
  // 임원 삭제
  remove: (options: Omit<Options, 'client'>) => 
    executivesControllerRemove({ ...options, client }),
  
  // 임원 단건 조회
  findOne: (options: Omit<Options, 'client'>) => 
    executivesControllerFindOne({ ...options, client }),
  
  // 임원 정보 수정
  update: (options: Omit<Options, 'client'>) => 
    executivesControllerUpdate({ ...options, client }),
  
  // 이름으로 임원 검색
  findByName: (options: Omit<Options, 'client'>) => 
    executivesControllerFindByName({ ...options, client }),
};
