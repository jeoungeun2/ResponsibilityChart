import { CreateClientConfig } from "@/generated/openapi-client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: '/api/backend',
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    // 서버 사이드에서는 global.fetch 사용, 클라이언트에서는 window.fetch 사용
    if (typeof window !== 'undefined') {
      return window.fetch(input, init);
    } else {
      // 서버 사이드에서는 global.fetch 사용
      return global.fetch(input, init);
    }
  },
});