// 자격 항목(QualiItems) 도메인 관련 API 함수들
import { 
  qualiItemDtoTsControllerFindAll,
  qualiItemDtoTsControllerCreate,
  qualiItemDtoTsControllerRemove,
  qualiItemDtoTsControllerFindOne,
  qualiItemDtoTsControllerUpdate,
  qualiItemDtoTsControllerRemoveByExecutiveId,
  qualiItemDtoTsControllerFindByExecutiveId,
  qualiItemDtoTsControllerFindByType,
  type Options 
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 기본 client를 사용하는 래핑된 함수들
export const qualiItemsApi = {
  // 모든 자격 항목 목록 조회
  findAll: (options?: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerFindAll({ ...options, client }),
  
  // 새로운 자격 항목 생성
  create: (options: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerCreate({ ...options, client }),
  
  // 자격 항목 삭제
  remove: (options: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerRemove({ ...options, client }),
  
  // 자격 항목 단건 조회
  findOne: (options: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerFindOne({ ...options, client }),
  
  // 자격 항목 정보 수정
  update: (options: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerUpdate({ ...options, client }),
  
  // 임원 ID로 자격 항목 삭제
  removeByExecutiveId: (options: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerRemoveByExecutiveId({ ...options, client }),
  
  // 임원 ID로 자격 항목 조회
  findByExecutiveId: (options: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerFindByExecutiveId({ ...options, client }),
  
  // 타입으로 자격 항목 조회
  findByType: (options: Omit<Options, 'client'>) => 
    qualiItemDtoTsControllerFindByType({ ...options, client }),
};
