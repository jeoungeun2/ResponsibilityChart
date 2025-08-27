// 평가(Evaluations) 도메인 관련 API 함수들
import { 
  evaluationsControllerFindByExecutiveId,
  evaluationsControllerCreateForExecutive,
  evaluationsControllerRemove,
  evaluationsControllerFindOne,
  evaluationsControllerUpdate,
  evaluationsControllerSaveDraft,
  type Options 
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 기본 client를 사용하는 래핑된 함수들
export const evaluationsApi = {
  // 임원 ID로 평가 목록 조회
  findByExecutiveId: (options: Omit<Options, 'client'>) => 
    evaluationsControllerFindByExecutiveId({ ...options, client }),
  
  // 임원을 위한 평가 생성
  createForExecutive: (options: Omit<Options, 'client'>) => 
    evaluationsControllerCreateForExecutive({ ...options, client }),
  
  // 평가 삭제
  remove: (options: Omit<Options, 'client'>) => 
    evaluationsControllerRemove({ ...options, client }),
  
  // 평가 단건 조회
  findOne: (options: Omit<Options, 'client'>) => 
    evaluationsControllerFindOne({ ...options, client }),
  
  // 평가 정보 수정
  update: (options: Omit<Options, 'client'>) => 
    evaluationsControllerUpdate({ ...options, client }),
  
  // 평가 임시저장 (IN_PROGRESS 상태)
  saveDraft: (options: Omit<Options, 'client'>) => 
    evaluationsControllerSaveDraft({ ...options, client }),
};
