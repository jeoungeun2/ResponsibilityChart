// 조직 등록(OrgRegistrations) 도메인 관련 API 함수들
import { 
  orgRegistrationsControllerFindAll,
  orgRegistrationsControllerCreate,
  orgRegistrationsControllerRemove,
  orgRegistrationsControllerFindOne,
  orgRegistrationsControllerUpdate,
  orgRegistrationsControllerRemoveByExecutiveId,
  orgRegistrationsControllerFindByExecutiveId,
  type Options 
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 기본 client를 사용하는 래핑된 함수들
export const orgRegistrationsApi = {
  // 모든 조직 등록 목록 조회
  findAll: (options?: Omit<Options, 'client'>) => 
    orgRegistrationsControllerFindAll({ ...options, client }),
  
  // 새로운 조직 등록 생성
  create: (options: Omit<Options, 'client'>) => 
    orgRegistrationsControllerCreate({ ...options, client }),
  
  // 조직 등록 삭제
  remove: (options: Omit<Options, 'client'>) => 
    orgRegistrationsControllerRemove({ ...options, client }),
  
  // 조직 등록 단건 조회
  findOne: (options: Omit<Options, 'client'>) => 
    orgRegistrationsControllerFindOne({ ...options, client }),
  
  // 조직 등록 정보 수정
  update: (options: Omit<Options, 'client'>) => 
    orgRegistrationsControllerUpdate({ ...options, client }),
  
  // 임원 ID로 조직 등록 삭제
  removeByExecutiveId: (options: Omit<Options, 'client'>) => 
    orgRegistrationsControllerRemoveByExecutiveId({ ...options, client }),
  
  // 임원 ID로 조직 등록 조회
  findByExecutiveId: (options: Omit<Options, 'client'>) => 
    orgRegistrationsControllerFindByExecutiveId({ ...options, client }),
};
