import { CreateClientConfig } from "@/generated/openapi-client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: '/api/backend',
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return window.fetch(input, init);
  },
});