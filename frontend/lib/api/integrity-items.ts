// 무결성 항목(IntegrityItems) 도메인 관련 API 함수들
import { 
  integrityItemControllerFindAll,
  integrityItemControllerCreate,
  integrityItemControllerRemove,
  integrityItemControllerFindOne,
  integrityItemControllerUpdate,
  integrityItemControllerRemoveByExecutiveId,
  integrityItemControllerFindByExecutiveId,
  integrityItemControllerFindByCategory,
  type Options 
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 기본 client를 사용하는 래핑된 함수들
export const integrityItemsApi = {
  // 모든 무결성 항목 목록 조회
  findAll: (options?: Omit<Options, 'client'>) => 
    integrityItemControllerFindAll({ ...options, client }),
  
  // 새로운 무결성 항목 생성
  create: (options: Omit<Options, 'client'>) => 
    integrityItemControllerCreate({ ...options, client }),
  
  // 무결성 항목 삭제
  remove: (options: Omit<Options, 'client'>) => 
    integrityItemControllerRemove({ ...options, client }),
  
  // 무결성 항목 단건 조회
  findOne: (options: Omit<Options, 'client'>) => 
    integrityItemControllerFindOne({ ...options, client }),
  
  // 무결성 항목 정보 수정
  update: (options: Omit<Options, 'client'>) => 
    integrityItemControllerUpdate({ ...options, client }),
  
  // 임원 ID로 무결성 항목 삭제
  removeByExecutiveId: (options: Omit<Options, 'client'>) => 
    integrityItemControllerRemoveByExecutiveId({ ...options, client }),
  
  // 임원 ID로 무결성 항목 조회
  findByExecutiveId: (options: Omit<Options, 'client'>) => 
    integrityItemControllerFindByExecutiveId({ ...options, client }),
  
  // 카테고리로 무결성 항목 조회
  findByCategory: (options: Omit<Options, 'client'>) => 
    integrityItemControllerFindByCategory({ ...options, client }),
};
