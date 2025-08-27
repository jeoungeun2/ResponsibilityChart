// App 도메인 관련 API 함수들
import { 
  appControllerGetHello, 
  appControllerTestUser,
  type Options 
} from '../../generated/openapi-client/sdk.gen';
import { client } from '../../generated/openapi-client/client.gen';

// 기본 client를 사용하는 래핑된 함수들
export const appApi = {
  // Hello API
  getHello: (options?: Omit<Options, 'client'>) => 
    appControllerGetHello({ ...options, client }),
  
  // 사용자 테스트 API (JWT 인증 필요)
  testUser: (options?: Omit<Options, 'client'>) => 
    appControllerTestUser({ ...options, client }),
};
