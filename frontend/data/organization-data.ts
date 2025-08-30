// 조직도 데이터 타입 정의
export interface OrganizationData {
  id: string;
  jobCode: string;           // 직책코드
  jobTitle: string;          // 직책
  orgDivision: string;       // 조직구분
  managedOrg: string;        // 관리대상조직
  responsibleDept: string;   // 소관부서
  responsibleTeam: string;   // 소관팀
  registrationDate: string;  // 등록일자
  effectiveStartDate: string; // 적용시작일자
  effectiveEndDate: string;   // 적용종료일자
}

// 조직도 샘플 데이터 - 이미지의 테이블과 일치하도록 업데이트
export const organizationSampleData: OrganizationData[] = [
  {
    id: "1",
    jobCode: "CE",
    jobTitle: "대표이사",
    orgDivision: "대표이사",
    managedOrg: "대표이사",
    responsibleDept: "전사",
    responsibleTeam: "전사",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "2",
    jobCode: "BD",
    jobTitle: "이사회 의장",
    orgDivision: "이사회 의장",
    managedOrg: "이사회 의장",
    responsibleDept: "전사",
    responsibleTeam: "전사",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "3",
    jobCode: "CO",
    jobTitle: "준법감시인",
    orgDivision: "경영지원",
    managedOrg: "준법감시인",
    responsibleDept: "준법감시실",
    responsibleTeam: "법무팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "4",
    jobCode: "AU",
    jobTitle: "감사실장",
    orgDivision: "감사실",
    managedOrg: "감사실",
    responsibleDept: "감사실",
    responsibleTeam: "감사팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "5",
    jobCode: "MK",
    jobTitle: "마케팅총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "마케팅총괄부문",
    responsibleDept: "기관마케팅본부",
    responsibleTeam: "법인마케팅팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "6",
    jobCode: "MK",
    jobTitle: "마케팅총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "마케팅총괄부문",
    responsibleDept: "기관마케팅본부",
    responsibleTeam: "기관마케팅팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "7",
    jobCode: "MK",
    jobTitle: "마케팅총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "마케팅총괄부문",
    responsibleDept: "기관마케팅본부",
    responsibleTeam: "WM연금마케팅팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "8",
    jobCode: "MK",
    jobTitle: "마케팅총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "마케팅총괄부문",
    responsibleDept: "기관마케팅본부",
    responsibleTeam: "WM연금사업팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "9",
    jobCode: "MK",
    jobTitle: "마케팅총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "마케팅총괄부문",
    responsibleDept: "기관마케팅본부",
    responsibleTeam: "WM연금마케팅팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "10",
    jobCode: "MK",
    jobTitle: "마케팅총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "마케팅총괄부문",
    responsibleDept: "디지털마케팅실",
    responsibleTeam: "카톡마케팅팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  // 추가 조직 데이터
  {
    id: "11",
    jobCode: "FI",
    jobTitle: "재무총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "재무총괄부문",
    responsibleDept: "재무본부",
    responsibleTeam: "재무팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "12",
    jobCode: "FI",
    jobTitle: "재무총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "재무총괄부문",
    responsibleDept: "재무본부",
    responsibleTeam: "회계팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "13",
    jobCode: "IT",
    jobTitle: "IT총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "IT총괄부문",
    responsibleDept: "IT본부",
    responsibleTeam: "시스템개발팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "14",
    jobCode: "IT",
    jobTitle: "IT총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "IT총괄부문",
    responsibleDept: "IT본부",
    responsibleTeam: "인프라팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "15",
    jobCode: "HR",
    jobTitle: "인사총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "인사총괄부문",
    responsibleDept: "인사본부",
    responsibleTeam: "인사팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "16",
    jobCode: "HR",
    jobTitle: "인사총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "인사총괄부문",
    responsibleDept: "인사본부",
    responsibleTeam: "교육팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "17",
    jobCode: "SA",
    jobTitle: "영업총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "영업총괄부문",
    responsibleDept: "영업본부",
    responsibleTeam: "기관영업팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "18",
    jobCode: "SA",
    jobTitle: "영업총괄부사장",
    orgDivision: "금융영업",
    managedOrg: "영업총괄부문",
    responsibleDept: "영업본부",
    responsibleTeam: "개인영업팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "19",
    jobCode: "RS",
    jobTitle: "리스크총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "리스크총괄부문",
    responsibleDept: "리스크본부",
    responsibleTeam: "리스크관리팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  },
  {
    id: "20",
    jobCode: "RS",
    jobTitle: "리스크총괄부사장",
    orgDivision: "경영지원",
    managedOrg: "리스크총괄부문",
    responsibleDept: "리스크본부",
    responsibleTeam: "규정준수팀",
    registrationDate: "2020-01-01",
    effectiveStartDate: "2020-01-01",
    effectiveEndDate: "2025-12-31"
  }
];
