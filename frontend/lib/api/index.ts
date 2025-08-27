// 모든 도메인별 API를 모아서 export
export { appApi } from './app';
export { responsibilitiesApi } from './responsibilities';
export { executivesApi } from './executives';
export { orgRegistrationsApi } from './org-registrations';
export { qualiItemsApi } from './quali-items';
export { integrityItemsApi } from './integrity-items';
export { evaluationsApi } from './evaluations';

// 타입도 함께 export (필요시 사용)
export type { Options } from '../../generated/openapi-client/sdk.gen';
